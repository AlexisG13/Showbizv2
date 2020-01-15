import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movies.entity';
import { MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repositories/movies.repository';
import { UpdateMovieQueryDto } from './dto/update-movie-query.dto';
import { TagsRepository } from '../tags/repositories/tags.repository';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { RentMovieDto } from './dto/rent-movie.dto';
import { Order } from 'src/users/entities/order.entity ';
import { GetMovieDto } from './dto/get-movie.dto';
import { OrderDto } from 'src/users/dto/order.dto';
import { RentalDetail } from 'src/users/entities/rent-detail.entity';
import { OrderDetail } from 'src/users/entities/order-detail.entity';
import { Rental } from 'src/users/entities/rental.entity';
import { RentDto } from 'src/users/dto/rent.dto';
import { EmailService } from 'src/email/email.service';

type order = 'DESC' | 'ASC';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly tagsRepository: TagsRepository,
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(RentalDetail)
    private readonly rentalDetailRepository: Repository<RentalDetail>,
    private readonly emailService: EmailService,
  ) {}

  async getAllMovies(query: GetMovieDto): Promise<Movie[]> {
    let myQuery = this.moviesRepository
      .createQueryBuilder('movie')
      .select('movie')
      .leftJoinAndSelect('movie.tags', 'tag');
    if (query.query) {
      myQuery = myQuery.where('LOWER(movie.title) like LOWER(:title)', {
        title: `%${query.query}%`,
      });
    }
    let tagsNumber = 0;
    if (query.tags) {
      const auxTags = query.tags.split(',').map(tag => tag.toLowerCase);
      tagsNumber = auxTags.length;
      myQuery = myQuery.andWhere('LOWER(tag.title) IN (:...auxTags)', { auxTags });
    }
    myQuery = myQuery.andWhere('movie.availability = :available', { available: true });
    let field = 'movie.title';
    let myOrder: order = 'ASC';
    if (query.sort) {
      const sorting = this.getSort(query);
      field = sorting.split(',')[0];
      const queryOrder = sorting.split(',')[1];
      if (queryOrder === 'DESC') {
        myOrder = 'DESC';
      }
    }
    myQuery = myQuery.orderBy(field, myOrder);
    const movies = await myQuery.getMany();
    return query.tags ? movies.filter(movie => movie.tags.length >= tagsNumber) : movies;
  }

  getSort(query: GetMovieDto): string {
    switch (query.sort) {
      case 'title-asc':
        return 'movie.title,ASC';
      case 'title-desc':
        return 'movie.title,DESC';
      case 'likes-asc':
        return 'movie.likes,ASC';
      case 'likes-desc':
        return 'movie.likes,DESC';
      default:
        return null;
    }
  }

  async getSingleMovie(movieId: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('The movie does not exist');
    }
    return movie;
  }

  async deleteMovie(movieId: number): Promise<void> {
    const movie = await this.moviesRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    movie.isActive = false;
    this.moviesRepository.save(movie);
    return;
  }

  async addMovie(movieDto: MovieDto): Promise<Movie> {
    const availableTags = await this.tagsRepository
      .createQueryBuilder('tag')
      .where('tag.title IN (:...tags)', { tags: movieDto.tags })
      .getMany();
    return this.moviesRepository.addMovie(movieDto, availableTags);
  }

  async updateMovie(movieId: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepository.findOne(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    if (await this.moviesRepository.findOne({ title: updateMovieDto.title })) {
      throw new ConflictException('A movie with the provided title already exists');
    }
    const { tags, ...movieFields } = updateMovieDto;
    const updatedMovie = new UpdateMovieQueryDto({ ...movie, ...movieFields });
    if (updateMovieDto.tags) {
      updatedMovie.tags = await this.tagsRepository
        .createQueryBuilder('tag')
        .where('tag.title IN (:...tags)', { tags: updateMovieDto.tags })
        .getMany();
    }
    return this.moviesRepository.save(updatedMovie);
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
    rental.details.forEach(async detail => {
      const movie = await this.moviesRepository.findOne(detail.movieId);
      movie.stock += detail.quantity;
      await this.moviesRepository.save(movie);
    });
    rental.isReturned = true;
    await this.rentalRepository.save(rental);
  }

  async buyMovie(user: User, orderDto: OrderDto): Promise<Order> {
    const details: OrderDetail[] = await Promise.all(
      orderDto.details.map(async detail => {
        const movie = await this.verifyMovie(detail.movieId, detail.quantity);
        movie.stock -= detail.quantity;
        const subtotal = movie.salePrice * detail.quantity;
        return { movie, quantity: detail.quantity, subtotal };
      }),
    );
    const newOrder = await this.ordersRepository.save({
      userId: user.id,
      boughtDate: new Date(),
      total: 0,
      details: [],
    });
    details.forEach(async detail => {
      detail.orderId = newOrder.id;
      newOrder.total += detail.subtotal;
      newOrder.details.push(detail);
      await this.orderDetailRepository.save(detail);
      await this.moviesRepository.save(detail.movie);
    });
    this.emailService.sendTransactionEmail(user, newOrder, 'order');
    return this.ordersRepository.save(newOrder);
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
