import { Role } from '../entities/role.entity';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/users.entity';

export class UserSerializer {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @Exclude()
  password: string;
  @Exclude()
  salt: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: Role;
  @Exclude()
  isActive: boolean;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
