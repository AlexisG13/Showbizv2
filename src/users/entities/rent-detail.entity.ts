import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from 'src/movies/entities/movies.entity';
import { Rental } from './rental.entity';

@Entity()
export class RentalDetail {
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
    type => Rental,
    rental => rental.details,
  )
  rental?: Rental;
  @ManyToOne(
    type => Movie,
    movie => movie.rentals,
  )
  movie?: Movie;
}
