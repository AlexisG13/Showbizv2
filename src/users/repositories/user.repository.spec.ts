import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './user.repository';

const mockUser = {
  title: 'Test title',
  id: 0,
  description: 'Test description',
  poster: 'Test poster',
  stock: 0,
  trailer: 'Test trailer',
  salePrice: 0,
  tags: [],
  availability: false,
  validatePassword: jest.fn().mockResolvedValue(true),
};

const mockAuthCredentials = {
  username: 'Test username',
  password: 'Test password',
  email: 'Test email',
};

const mockLoginCredentials = {
  username: 'Test username',
  password: 'Test password',
};

const mockRole = {
  id: 0,
  title: 'client',
  users: [],
};

const mockPasswordDto = {
  username: 'Test username',
  password: 'Test-password',
  newPassword: 'New test-password',
};

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersRepository],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('signUp', () => {
    beforeEach(() => {
      usersRepository.save = jest.fn().mockResolvedValue(mockUser);
      const genSalt = jest.fn().mockResolvedValue('A salt');
      const hash = jest.fn().mockResolvedValue('A hashed password');
    });

    it('signs up an user', async () => {
      usersRepository.findOne = jest.fn().mockResolvedValue(null);
      const result = await usersRepository.signUp(mockAuthCredentials, mockRole);
      expect(result).toEqual(mockUser);
    });

    it('throws an error if the movie already exists', async () => {
      usersRepository.findOne = jest.fn().mockResolvedValue(true);
      expect(usersRepository.signUp(mockAuthCredentials, mockRole)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('resetPassword', () => {
    it('Should reset an user password', () => {
      usersRepository.save = jest.fn().mockResolvedValue(mockUser);
      usersRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      const genSalt = jest.fn().mockResolvedValue('A salt');
      const hash = jest.fn().mockResolvedValue('A hashed password');
      const result = usersRepository.resetPassword(0, 'A new password');
      expect(result).resolves.not.toThrow();
    });
    it('Should throw an error if the user does not exist', () => {
      usersRepository.findOne = jest.fn().mockResolvedValue(null);
      expect(usersRepository.resetPassword(1, 'A new password')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('validatePassword', () => {
    it('Should validate if a password is correct', async () => {
      usersRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      const result = await usersRepository.validatePassword(mockLoginCredentials);
      expect(result).toEqual(mockUser);
    });
    it('Should return null if the user does not exist or the password is wrong', async () => {
      usersRepository.findOne = jest.fn().mockResolvedValue(null);
      const result = await usersRepository.validatePassword(mockLoginCredentials);
      expect(result).toEqual(null);
    });
  });

  describe('changePassword', () => {
    it('Should change password of an user', () => {
      const genSalt = jest.fn().mockResolvedValue('A salt');
      const hash = jest.fn().mockResolvedValue('A hashed password');
      usersRepository.save = jest.fn().mockResolvedValue(mockUser);
      expect(usersRepository.changePassword(mockUser, mockPasswordDto)).resolves.not.toThrow();
    });
    it('Should throw unathorized error if a wrong password is entered', () => {
      mockUser.validatePassword.mockResolvedValue(false);
      usersRepository.save = jest.fn().mockResolvedValue(mockUser);
      expect(usersRepository.changePassword(mockUser, mockPasswordDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
