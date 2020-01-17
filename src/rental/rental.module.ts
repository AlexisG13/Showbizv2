import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalDetail } from './entities/rent-detail.entity';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { Rental } from './entities/rental.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  providers: [RentalService],
  exports: [RentalService],
  imports: [TypeOrmModule.forFeature([Rental, RentalDetail, MoviesRepository]), EmailModule],
})
export class RentalModule {}
