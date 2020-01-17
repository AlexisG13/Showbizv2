import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { RentalModule } from './rental/rental.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    UsersModule,
    MoviesModule,
    TypeOrmModule.forRoot(),
    TagsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    RentalModule,
    OrderModule,
  ],
})
export class AppModule {}
