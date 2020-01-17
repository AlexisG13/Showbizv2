import { Test, TestingModule } from '@nestjs/testing';
import { RentalService } from './rental.service';
import { Rental } from './entities/rental.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { RentalDetail } from './entities/rent-detail.entity';
import { MoviesRepository } from '../movies/repositories/movies.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

const mockRentalRepistory = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
});
const mockRentalDetailRepistory = () => ({});
const mockMovieRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn().mockResolvedValue('test-value'),
});

const mockEmailService = () => ({
  sendTransactionEmail: jest.fn(),
});

const mockUser = {
  id: 0,
  username: 'testusername',
  email: 'testemail',
  validatePassword: jest.fn(),
};

const mockMovieWithStock = {
  id: 0,
  title: 'Test title',
  description: 'Test description',
  salePrice: 0,
  stock: 2,
  availability: true,
  likes: 0,
  poster: 'test poster',
  trailer: 'test trailer',
  tags: [],
};

const mockMovieWithoutStock = {
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

const mockRental = {
  details: [],
  isReturned: false,
};

const mockRentDto = {
  devolutionDate: new Date('2020-01-17T20:55:57.298Z'),
  details: [],
};

describe('RentalService', () => {
  let service: RentalService;
  let moviesRepository: MoviesRepository;
  let rentalsRepository: Repository<Rental>;
  let emailService: EmailService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalService,
        { provide: EmailService, useFactory: mockEmailService },
        { provide: getRepositoryToken(Rental), useFactory: mockRentalRepistory },
        { provide: getRepositoryToken(RentalDetail), useFactory: mockRentalDetailRepistory },
        { provide: MoviesRepository, useFactory: mockMovieRepository },
      ],
    }).compile();

    service = module.get<RentalService>(RentalService);
    moviesRepository = module.get<MoviesRepository>(MoviesRepository);
    rentalsRepository = module.get(getRepositoryToken(Rental));
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRentals', () => {
    it('Should get all rentals', async () => {
      (rentalsRepository.find as jest.Mock).mockResolvedValue('Return all rentals');
      const result = await service.getRentals(mockUser);
      expect(result).toEqual('Return all rentals');
    });
  });

  describe('returnMovies', () => {
    it('Should return all the movies in a rent', async () => {
      (rentalsRepository.findOne as jest.Mock).mockResolvedValue(mockRental);
      (rentalsRepository.save as jest.Mock).mockResolvedValue('test value');
      const result = await service.returnMovies(mockUser, 0);
      expect(rentalsRepository.findOne).toBeCalledTimes(1);
      expect(rentalsRepository.save).toBeCalledTimes(1);
    });

    it('Should throw an error when the rental does not exist', () => {
      (rentalsRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(service.returnMovies(mockUser, 1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('verifyMovie', () => {
    const neededStock = 2;
    const movieId = 0;
    it('Should return the movie if it exists and has enough stock', async () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(mockMovieWithStock);
      const result = await service.verifyMovie(movieId, neededStock);
      expect(result).toEqual(mockMovieWithStock);
    });
    it('Should throw an error when the movie does not exist', () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(service.verifyMovie(movieId, neededStock)).rejects.toThrowError(NotFoundException);
    });
    it(`Should throw an error when the movie doesn't have enough stock or is unavailable`, () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(mockMovieWithoutStock);
      expect(service.verifyMovie(movieId, neededStock)).rejects.toThrowError(ConflictException);
    });
  });

  describe('rentMovie', () => {
    it('Should return a rental', async () => {
      (rentalsRepository.save as jest.Mock).mockResolvedValue(mockRental);
      (emailService.sendTransactionEmail as jest.Mock).mockResolvedValue('Send an email');
      const result = await service.rentMovie(mockUser, mockRentDto);
      expect(result).toEqual(mockRental);
    });
  });
});
