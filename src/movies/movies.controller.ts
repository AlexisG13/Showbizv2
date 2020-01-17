import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { GetMovieDto } from './dto/get-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from '../users/entities/users.entity';
import { RolesGuard } from '../auth/guards/role.guard';
import { SignedGuard } from '../auth/guards/signed.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(@Query() query: GetMovieDto): Promise<Movie[]> {
    return this.moviesService.getAllMovies(query);
  }

  @Get(':id')
  getSingleMovie(@Param('id') movieId: number): Promise<Movie> {
    return this.moviesService.getSingleMovie(movieId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard, SignedGuard)
  deleteMovie(@Param('id') movieId: number): Promise<void> {
    return this.moviesService.deleteMovie(movieId);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard, SignedGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  addMovie(@Body() movieDto: MovieDto, @GetUser() user: User): Promise<Movie> {
    return this.moviesService.addMovie(movieDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard, SignedGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  updateMovie(
    @Body() updateMovieDto: UpdateMovieDto,
    @Param('id') movieId: number,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(movieId, updateMovieDto);
  }
}
