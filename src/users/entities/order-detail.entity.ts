import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity ';
import { Movie } from 'src/movies/entities/movies.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  orderId?: number;
  @Column()
  movieId?: number;
  @Column()
  quantity?: number;
  @Column()
  subtotal?: number;
  @ManyToOne(
    type => Order,
    order => order.details,
  )
  order?: Order;
  @ManyToOne(
    type => Movie,
    movie => movie.orders,
  )
  movie?: Movie;
}
