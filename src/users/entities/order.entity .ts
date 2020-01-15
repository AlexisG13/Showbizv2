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

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @CreateDateColumn({ default: new Date() })
  boughtDate: Date;
  @Column()
  total: number;
  @UpdateDateColumn()
  updatedDate: Date;
  @ManyToOne(
    type => User,
    user => user.orders,
  )
  user: User;
  @OneToMany(
    type => OrderDetail,
    detail => detail.order,
  )
  details: OrderDetail[];
}
