import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { Rental } from './entities/rental.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentalDetail } from './entities/rent-detail.entity';
import { MoviesRepository } from '../movies/repositories/movies.repository';
import { EmailService } from '../email/email.service';
import { Movie } from '../movies/entities/movies.entity';
import { RentDto } from './dto/rent.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(RentalDetail)
    private readonly rentalDetailRepository: Repository<RentalDetail>,
    private readonly moviesRepository: MoviesRepository,
    private readonly emailService: EmailService,
  ) {}

  getRentals(user: User): Promise<Rental[]> {
    return this.rentalRepository.find({ userId: user.id });
  }

  async rentMovie(user: User, rentDto: RentDto): Promise<Rental> {
    const details: RentalDetail[] = await Promise.all(
      rentDto.details.map(async detail => {
        const movie = await this.verifyMovie(detail.movieId, detail.quantity);
        movie.stock -= detail.quantity;
        const subtotal = movie.salePrice * detail.quantity;
        return { movie, quantity: detail.quantity, subtotal };
      }),
    );
    const newRental = await this.rentalRepository.save({
      userId: user.id,
      boughtDate: new Date(),
      devolutionDate: rentDto.devolutionDate,
      total: 0,
      details: [],
    });
    details.forEach(async detail => {
      detail.orderId = newRental.id;
      newRental.total += detail.subtotal;
      newRental.details.push(detail);
      await this.rentalDetailRepository.save(detail);
      await this.moviesRepository.save(detail.movie);
    });
    this.emailService.sendTransactionEmail(user, newRental, 'rental');
    return this.rentalRepository.save(newRental);
  }

  async returnMovies(user: User, rentId: number): Promise<void> {
    const rental = await this.rentalRepository.findOne({
      relations: ['details'],
      where: { id: rentId },
    });
    if (!rental) {
      throw new NotFoundException('The rental does not exist');
    }
    rental.details.forEach(async detail => {
      const movie = await this.moviesRepository.findOne(detail.movieId);
      movie.stock += detail.quantity;
      await this.moviesRepository.save(movie);
    });
    rental.isReturned = true;
    await this.rentalRepository.save(rental);
  }

  async verifyMovie(movieId: number, stock: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    if (!movie.stock || movie.stock < stock) {
      throw new ConflictException('Movie out of stock');
    }
    return movie;
  }
}
