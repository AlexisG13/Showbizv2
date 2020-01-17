import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './repositories/movies.repository';
import { TagsRepository } from '../tags/repositories/tags.repository';
import { UsersRepository } from '../users/repositories/user.repository';
import { JWT } from '../users/entities/jwt.entity';
import { Order } from '../users/entities/order.entity ';
import { OrderDetail } from '../users/entities/order-detail.entity';
import { EmailModule } from '../email/email.module';
import { Rental } from '../rental/entities/rental.entity';
import { RentalDetail } from '../rental/entities/rent-detail.entity';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [
    AuthModule,
    EmailModule,
    TypeOrmModule.forFeature([
      MoviesRepository,
      TagsRepository,
      UsersRepository,
      JWT,
      Rental,
      Order,
      OrderDetail,
      RentalDetail,
    ]),
  ],
  exports: [MoviesService],
})
export class MoviesModule {}
