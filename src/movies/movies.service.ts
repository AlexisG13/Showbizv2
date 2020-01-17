import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repositories/movies.repository';
import { UpdateMovieQueryDto } from './dto/update-movie-query.dto';
import { TagsRepository } from '../tags/repositories/tags.repository';
import { GetMovieDto } from './dto/get-movie.dto';

type order = 'DESC' | 'ASC';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly tagsRepository: TagsRepository,
  ) {}

  async getAllMovies(query: GetMovieDto): Promise<Movie[]> {
    let myQuery = this.moviesRepository
      .createQueryBuilder('movie')
      .select('movie')
      .leftJoinAndSelect('movie.tags', 'tag');
    if (query.query) {
      myQuery = myQuery.where('LOWER(movie.title) like LOWER(:title)', {
        title: `%${query.query}%`,
      });
    }
    let tagsNumber = 0;
    if (query.tags) {
      const auxTags = query.tags.split(',').map(tag => tag.toLowerCase());
      tagsNumber = auxTags.length;
      myQuery = myQuery.andWhere('LOWER(tag.title) IN (:...auxTags)', { auxTags });
    }
    myQuery = myQuery.andWhere('movie.availability = :available', { available: true });
    let field = 'movie.title';
    let myOrder: order = 'ASC';
    if (query.sort) {
      const sorting = this.getSort(query);
      field = sorting.split(',')[0];
      const queryOrder = sorting.split(',')[1];
      if (queryOrder === 'DESC') {
        myOrder = 'DESC';
      }
    }
    myQuery = myQuery.orderBy(field, myOrder);
    const movies = await myQuery.getMany();
    return query.tags ? movies.filter(movie => movie.tags.length >= tagsNumber) : movies;
  }

  getSort(query: GetMovieDto): string {
    switch (query.sort) {
      case 'title-asc':
        return 'movie.title,ASC';
      case 'title-desc':
        return 'movie.title,DESC';
      case 'likes-asc':
        return 'movie.likes,ASC';
      case 'likes-desc':
        return 'movie.likes,DESC';
      default:
        return null;
    }
  }

  async getSingleMovie(movieId: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('The movie does not exist');
    }
    return movie;
  }

  async deleteMovie(movieId: number): Promise<void> {
    const movie = await this.moviesRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    movie.isActive = false;
    this.moviesRepository.save(movie);
    return;
  }

  async addMovie(movieDto: MovieDto): Promise<Movie> {
    let availableTags = [];
    if (movieDto.tags) {
      availableTags = await this.tagsRepository
        .createQueryBuilder('tag')
        .where('tag.title IN (:...tags)', { tags: movieDto.tags })
        .getMany();
    }
    return this.moviesRepository.addMovie(movieDto, availableTags);
  }

  async updateMovie(movieId: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepository.findOne(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    if (await this.moviesRepository.findOne({ title: updateMovieDto.title })) {
      throw new ConflictException('A movie with the provided title already exists');
    }
    const { tags, ...movieFields } = updateMovieDto;
    const updatedMovie = new UpdateMovieQueryDto({ ...movie, ...movieFields });
    if (updateMovieDto.tags) {
      updatedMovie.tags = await this.tagsRepository
        .createQueryBuilder('tag')
        .where('tag.title IN (:...tags)', { tags: updateMovieDto.tags })
        .getMany();
    }
    return this.moviesRepository.save(updatedMovie);
  }
}
