import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/user.repository';
import { ConfigModule } from '@nestjs/config';
import { Rental } from '../rental/entities/rental.entity';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { Order } from './entities/order.entity ';
import { AuthModule } from '../auth/auth.module';
import { Role } from './entities/role.entity';
import { JWT } from './entities/jwt.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { ResetToken } from 'src/auth/entities/password-jwt.entity';
import { RentalModule } from 'src/rental/rental.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UsersRepository, MoviesRepository, Order, Role, JWT, ResetToken]),
    AuthModule,
    ConfigModule,
    MoviesModule,
    RentalModule,
    OrderModule,
  ],
})
export class UsersModule {}
