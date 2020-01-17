/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from '../../tags/entities/tags.entity';
import { OrderDetail } from '../../users/entities/order-detail.entity';
import { RentalDetail } from '../../rental/entities/rent-detail.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title?: string;
  @Column()
  description?: string;
  @Column()
  poster?: string;
  @Column()
  stock?: number;
  @Column()
  trailer?: string;
  @Column()
  salePrice?: number;
  @Column({ default: 0 })
  likes?: number;
  @Column()
  availability?: boolean;
  @Column({ default: true })
  isActive?: boolean;
  @CreateDateColumn()
  createDate?: Date;
  @UpdateDateColumn()
  updateDate?: Date;
  @ApiHideProperty()
  @OneToMany(
    type => OrderDetail,
    order => order.movie,
  )
  orders?: OrderDetail[];
  @ApiHideProperty()
  @OneToMany(
    type => RentalDetail,
    rental => rental.movie,
  )
  rentals?: RentalDetail[];
  @ApiHideProperty()
  @ManyToMany(
    type => Tag,
    tag => tag.movies,
    { eager: true },
  )
  @JoinTable()
  tags?: Tag[];
}
