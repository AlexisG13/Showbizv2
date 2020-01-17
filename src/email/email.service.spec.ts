import { EmailService } from './email.service';
import { TestingModule, Test } from '@nestjs/testing';
import { send } from '@sendgrid/mail';

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

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  describe('sendTransactionEmail', () => {
    it('Send an email when ordering or renting', () => {
      expect(send).not.toHaveBeenCalled();
      emailService.sendTransactionEmail(mockUser, mockTransaction, 'order');
      expect(send).toHaveBeenCalledTimes(1);
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('Send and email when asking for a password reset', () => {
      expect(send).toHaveBeenCalledTimes(1);
      emailService.sendPassworResetEmail(mockUser, 'test-reset-token');
      expect(send).toHaveBeenCalledTimes(2);
    });
  });
});
