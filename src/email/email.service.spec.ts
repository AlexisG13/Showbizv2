import { EmailService } from './email.service';
import { TestingModule, Test } from '@nestjs/testing';
import { send } from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

jest.mock('@sendgrid/mail');

const mockUser = {
  id: 0,
  username: 'testusername',
  email: 'testemail',
  validatePassword: jest.fn(),
};

const mockTransaction = {
  id: 0,
  userId: 0,
  boughDate: new Date(),
  total: 0,
};

const mockRentalTransaction = {
  id: 0,
  userId: 0,
  boughDate: new Date(),
  total: 0,
  devolutionDate: new Date('2020-01-17T20:55:57.298Z'),
};

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, ConfigService],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  describe('sendTransactionEmail', () => {
    it('Should send an email when making an order', () => {
      expect(send).not.toHaveBeenCalled();
      emailService.sendTransactionEmail(mockUser, mockTransaction, 'order');
      expect(send).toHaveBeenCalledTimes(1);
    });
    it('Should send an email when making a rental', () => {
      expect(send).not.toHaveBeenCalled();
      emailService.sendTransactionEmail(mockUser, mockRentalTransaction, 'rental');
      expect(send).toHaveBeenCalledTimes(1);
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('Send and email when asking for a password reset', () => {
      expect(send).not.toHaveBeenCalled();
      emailService.sendPassworResetEmail(mockUser, 'test-reset-token');
      expect(send).toHaveBeenCalledTimes(1);
    });
  });
});
