/* istanbul ignore file */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity()
export class ResetToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  jwt: string;
  @CreateDateColumn()
  createDate: Date;
  @ManyToOne(
    type => User,
    user => user.resetTokens,
  )
  user: User;
}
