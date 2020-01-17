import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/movies.entity';
import { MovieDto } from '../dto/create-movie.dto';
import { ConflictException } from '@nestjs/common';
import { Tag } from 'src/tags/entities/tags.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async addMovie(movieDto: MovieDto, tags: Tag[]): Promise<Movie> {
    const { title, description, poster, stock, trailer, salePrice, availability, likes } = movieDto;
    const exists = await this.findOne({ title: movieDto.title });
    if (exists) {
      throw new ConflictException('Movie already exists');
    }
    const newMovie = {
      title,
      description,
      poster,
      stock,
      trailer,
      salePrice,
      availability,
      tags,
      likes,
    };
    return this.save(newMovie);
  }
}
