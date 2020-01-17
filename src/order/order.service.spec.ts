import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { EmailService } from '../email/email.service';
import { Order } from '../users/entities/order.entity ';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderDetail } from '../users/entities/order-detail.entity';
import { MoviesRepository } from '../movies/repositories/movies.repository';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';

const mockOrderRepistory = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});
const mockMovieRepistory = () => ({});
const mockOrderDetailRepistory = () => ({});

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

describe('OrderService', () => {
  let orderService: OrderService;
  let emailService: EmailService;
  let orderRepository: Repository<Order>;
  let moviesRepository: MoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        EmailService,
        { provide: getRepositoryToken(Order), useFactory: mockOrderRepistory },
        { provide: getRepositoryToken(OrderDetail), useFactory: mockOrderDetailRepistory },
        { provide: MoviesRepository, useFactory: mockOrderRepistory },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    emailService = module.get<EmailService>(EmailService);
    orderRepository = module.get(getRepositoryToken(Order));
    moviesRepository = module.get<MoviesRepository>(MoviesRepository);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('getOrders', () => {
    it('Should get all orders', async () => {
      (orderRepository.find as jest.Mock).mockResolvedValue('Return all orders');
      const result = await orderService.getOrders(mockUser);
      expect(result).toEqual('Return all orders');
    });
  });

  describe('verifyMovie', () => {
    const neededStock = 2;
    const movieId = 0;
    it('Should return the movie if it exists and has enough stock', async () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(mockMovieWithStock);
      const result = await orderService.verifyMovie(movieId, neededStock);
      expect(result).toEqual(mockMovieWithStock);
    });
    it('Should throw an error when the movie does not exist', () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(orderService.verifyMovie(movieId, neededStock)).rejects.toThrowError(
        NotFoundException,
      );
    });
    it(`Should throw an error when the movie doesn't have enough stock or is unavailable`, () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(mockMovieWithoutStock);
      expect(orderService.verifyMovie(movieId, neededStock)).rejects.toThrowError(
        ConflictException,
      );
    });
  });
});
