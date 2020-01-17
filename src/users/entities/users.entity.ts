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
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['username'])
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;
  @ApiProperty()
  @Column()
  username?: string;
  @ApiProperty()
  @Column()
  email?: string;
  @Exclude()
  @ApiHideProperty()
  @Column()
  password?: string;
  @Exclude()
  @Column()
  @ApiHideProperty()
  salt?: string;
  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
  @ApiProperty()
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
  @ApiHideProperty()
  @Column({ default: true })
  isActive?: boolean;
  @ApiHideProperty()
  @ManyToOne(
    type => Role,
    role => role.users,
    { eager: true },
  )
  role?: Role;
  @ApiHideProperty()
  @OneToMany(
    type => JWT,
    jwt => jwt.user,
  )
  jwts?: JWT[];
  @ApiHideProperty()
  @OneToMany(
    type => ResetToken,
    resetToken => resetToken.user,
  )
  resetTokens?: ResetToken[];
  @ApiHideProperty()
  @OneToMany(
    type => Rental,
    rental => rental.user,
  )
  rents?: Rental[];
  @ApiHideProperty()
  @OneToMany(
    type => Order,
    order => order.user,
  )
  orders?: Order[];
  @ApiHideProperty()
  async validatePassword(password: string): Promise<boolean> {
    const validate = await hash(password, this.salt);
    return validate === this.password;
  }
}
