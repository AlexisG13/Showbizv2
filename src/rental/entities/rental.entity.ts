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
import { User } from '../../users/entities/users.entity';
import { RentalDetail } from './rent-detail.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  userId?: number;
  @CreateDateColumn({ default: new Date() })
  createDate?: Date;
  @Column()
  total?: number;
  @UpdateDateColumn()
  updatedDate?: Date;
  @Column({ default: false })
  isReturned?: boolean;
  @Column()
  devolutionDate?: Date;
  @ManyToOne(
    type => User,
    user => user.orders,
  )
  user?: User;
  @OneToMany(
    type => RentalDetail,
    detail => detail.rental,
  )
  details?: RentalDetail[];
}
