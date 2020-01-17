import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../users/entities/order.entity ';
import { OrderDetail } from '../users/entities/order-detail.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { OrderDto } from '../users/dto/order.dto';
import { MoviesRepository } from '../movies/repositories/movies.repository';
import { Movie } from '../movies/entities/movies.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly moviesRepository: MoviesRepository,
  ) {}

  getOrders(user: User): Promise<Order[]> {
    return this.ordersRepository.find({ userId: user.id });
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
