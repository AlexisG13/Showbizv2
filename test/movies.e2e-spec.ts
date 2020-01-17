import { INestApplication } from '@nestjs/common';
import { MoviesModule } from '../src/movies/movies.module';
import { Test } from '@nestjs/testing';
import { MoviesService } from '../src/movies/movies.service';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Movies', () => {
  let app: INestApplication;
  let moviesService = {
    getAllMovies: () => ['some movies'],
    getSingleMovie: (id: number) => `Movie with id ${id}`,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [MoviesModule, ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot()],
    })
      .overrideProvider(MoviesService)
      .useValue(moviesService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET movies`, () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect(moviesService.getAllMovies());
  });

  it(`/GET movies/:id`, () => {
    return request(app.getHttpServer())
      .get('/movies/0')
      .expect(200)
      .expect(moviesService.getSingleMovie(0));
  });

  afterAll(async () => {
    await app.close();
  });
});
