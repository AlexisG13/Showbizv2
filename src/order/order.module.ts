import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { Order } from 'src/users/entities/order.entity ';
import { OrderDetail } from 'src/users/entities/order-detail.entity';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';

@Module({
  providers: [OrderService],
  exports: [OrderService],
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, MoviesRepository]), EmailModule],
})
export class OrderModule {}
