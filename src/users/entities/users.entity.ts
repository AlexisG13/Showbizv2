/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Role } from './role.entity';
import { JWT } from './jwt.entity';
import { Order } from './order.entity ';
import { Rental } from '../../rental/entities/rental.entity';
import { ResetToken } from '../../auth/entities/password-jwt.entity';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  username?: string;
  @Column()
  email?: string;
  @Column()
  password?: string;
  @Column()
  salt?: string;
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
  @Column({ default: true })
  isActive?: boolean;
  @ManyToOne(
    type => Role,
    role => role.users,
    { eager: true },
  )
  role?: Role;
  @OneToMany(
    type => JWT,
    jwt => jwt.user,
  )
  jwts?: JWT[];

  @OneToMany(
    type => ResetToken,
    resetToken => resetToken.user,
  )
  resetTokens?: ResetToken[];

  @OneToMany(
    type => Rental,
    rental => rental.user,
  )
  rents?: Rental[];

  @OneToMany(
    type => Order,
    order => order.user,
  )
  orders?: Order[];

  async validatePassword(password: string): Promise<boolean> {
    const validate = await hash(password, this.salt);
    return validate === this.password;
  }
}
