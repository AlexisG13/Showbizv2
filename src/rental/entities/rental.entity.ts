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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Rental {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  userId?: number;
  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createDate?: Date;
  @ApiProperty()
  @Column()
  total?: number;
  @UpdateDateColumn()
  updatedDate?: Date;
  @Column({ default: false })
  @ApiProperty()
  isReturned?: boolean;
  @ApiProperty()
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
