/* istanbul ignore file */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './users.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ApiHideProperty()
  @OneToMany(
    type => User,
    user => user.role,
  )
  users: User[];
}
