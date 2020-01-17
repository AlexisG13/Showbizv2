/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './users.entity';
import { OrderDetail } from './order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  userId: number;
  @CreateDateColumn({ default: new Date() })
  @ApiProperty()
  boughtDate: Date;
  @ApiProperty()
  @Column()
  total: number;
  @UpdateDateColumn()
  updatedDate: Date;
  @ManyToOne(
    type => User,
    user => user.orders,
  )
  @ApiProperty()
  user: User;
  @OneToMany(
    type => OrderDetail,
    detail => detail.order,
  )
  @ApiProperty()
  details: OrderDetail[];
}
