import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { TagsRepository } from '../tags/repositories/tags.repository';
import { MoviesRepository } from './repositories/movies.repository';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Rental } from '../rental/entities/rental.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockMoviesRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  addMovie: jest.fn().mockResolvedValue(mockMovie),
  createQueryBuilder: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValue([]),
    orderBy: jest.fn().mockReturnThis(),
  })),
});

const mockTagsRepository = () => ({
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValueOnce(null),
  })),
});

const mockRentalRepository = () => ({});

const mockMovie = {
  id: 0,
  title: 'Test title',
  description: 'Test description',
  salePrice: 0,
  stock: 0,
  availability: true,
  likes: 0,
  poster: 'test poster',
  trailer: 'test trailer',
  tags: [],
};

const mockAddMovie = {
  title: 'New Test title',
  description: ' Test description',
  salePrice: 0,
  stock: 0,
  availability: true,
  likes: 0,
  poster: 'test poster',
  trailer: 'test trailer',
  tags: [],
};

const mockUpdateMovieNoTags = {
  title: 'New Test title',
  description: ' Test description',
  salePrice: 0,
  stock: 0,
  availability: true,
  likes: 0,
  poster: 'test poster',
  trailer: 'test trailer',
};

const mockUpdateMovieWithTags = {
  title: 'New Test title',
  description: ' Test description',
  salePrice: 0,
  stock: 0,
  availability: true,
  likes: 0,
  poster: 'test poster',
  trailer: 'test trailer',
  tags: [],
};

const mockGetMovieDto = {
  sort: 'title-asc',
  tags: 'test-tag',
  query: 'Test movie title',
};

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let tagsRepository: TagsRepository;
  let moviesRepository: MoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: TagsRepository, useFactory: mockTagsRepository },
        { provide: MoviesRepository, useFactory: mockMoviesRepository },
        { provide: getRepositoryToken(Rental), useFactory: mockRentalRepository },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MoviesRepository>(MoviesRepository);
    tagsRepository = module.get<TagsRepository>(TagsRepository);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
    expect(moviesRepository).toBeDefined();
    expect(tagsRepository).toBeDefined();
  });

  describe('getSingleMovie', () => {
    it('get a single movie from the repository', async () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(mockMovie);
      expect(moviesRepository.findOne).not.toHaveBeenCalled();
      const result = await moviesService.getSingleMovie(0);
      expect(result).toEqual(mockMovie);
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        id: mockMovie.id,
      });
    });

    it('throws an error when the movie does not exist', async () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(moviesService.getSingleMovie(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('addMovie', () => {
    it('add a movie to the repository', async () => {
      const result = await moviesService.addMovie(mockAddMovie);
      expect(result).toEqual(mockMovie);
    });
  });

  describe('deleteMovie', () => {
    it('deletes a movie from the repository', async () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(mockMovie);
      expect(moviesRepository.findOne).not.toHaveBeenCalled();
      const result = await moviesService.deleteMovie(0);
      expect(moviesRepository.findOne).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
    it('Should throw error if movie does not exist', () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(moviesService.deleteMovie(0)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getSort', () => {
    it('get sort by movie title , ascending', () => {
      const result = moviesService.getSort({ sort: 'title-asc' });
      expect(result).toEqual('movie.title,ASC');
    });
    it('get sort by movie title , descending', () => {
      const result = moviesService.getSort({ sort: 'title-desc' });
      expect(result).toEqual('movie.title,DESC');
    });
    it('get sort by likes , ascending', () => {
      const result = moviesService.getSort({ sort: 'likes-asc' });
      expect(result).toEqual('movie.likes,ASC');
    });
    it('get sort by likes , descending', () => {
      const result = moviesService.getSort({ sort: 'likes-desc' });
      expect(result).toEqual('movie.likes,DESC');
    });
    it('get no sort when unknown sort criteria is given', () => {
      const result = moviesService.getSort({ sort: 'unknown-sort-criteria' });
      expect(result).toEqual(null);
    });
  });

  describe('updateMovie', () => {
    it('Should update a movie, without updating tags', async () => {
      (moviesRepository.findOne as jest.Mock)
        .mockResolvedValueOnce(mockMovie)
        .mockResolvedValueOnce(null);
      (moviesRepository.save as jest.Mock).mockResolvedValue(mockMovie);
      const result = await moviesService.updateMovie(0, mockUpdateMovieNoTags);
      expect(result).toEqual(mockMovie);
    });

    it('Should update a movie, including tags', async () => {
      (moviesRepository.findOne as jest.Mock)
        .mockResolvedValueOnce(mockMovie)
        .mockResolvedValueOnce(null);
      (moviesRepository.save as jest.Mock).mockResolvedValue(mockMovie);
      const result = await moviesService.updateMovie(0, mockUpdateMovieWithTags);
      expect(result).toEqual(mockMovie);
    });

    it('Should throw a NotFound error if the movie does not exist', async () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(moviesService.updateMovie(0, mockUpdateMovieNoTags)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('Should throw a conflict error in a movie with the new title already exists', async () => {
      (moviesRepository.findOne as jest.Mock)
        .mockResolvedValueOnce(mockMovie)
        .mockResolvedValueOnce(true);
      expect(moviesService.updateMovie(0, mockUpdateMovieNoTags)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('getAllMovies', () => {
    it('Get all movies without any options', async () => {
      const result = await moviesService.getAllMovies({});
      expect(result).toEqual([]);
    });
    it('Get all movies, including sorting, query and tags', async () => {
      const result = await moviesService.getAllMovies(mockGetMovieDto);
      expect(result).toEqual([]);
    });
  });
});
