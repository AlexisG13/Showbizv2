/* istanbul ignore file */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from '../../movies/entities/movies.entity';
import { Rental } from './rental.entity';
import { ApiHideProperty } from '@nestjs/swagger';

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
  @ApiHideProperty()
  @ManyToOne(
    type => Rental,
    rental => rental.details,
  )
  rental?: Rental;
  @ApiHideProperty()
  @ManyToOne(
    type => Movie,
    movie => movie.rentals,
  )
  movie?: Movie;
}
