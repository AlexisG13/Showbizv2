import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { Order } from 'src/users/entities/order.entity ';
import { Rental } from 'src/rental/entities/rental.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(configService.get('SENDGRID_API_KEY'));
  }

  sendTransactionEmail(user: User, transaction: Order | Rental, type: string): void {
    const templateId = this.configService.get('TRANSACTION_TEMPLATE_KEY');
    let devolutionDate;
    if (type === 'rental') {
      devolutionDate = (transaction as Rental).devolutionDate.toDateString;
    }
    const msg = {
      to: this.configService.get('TEST_EMAIL'),
      from: 'showbiz@movies.test',
      subject: 'Check your latest order details!',
      templateId,
      dynamicTemplateData: { ...transaction, devolutionDate, username: user.username, type },
    };
    sgMail.send(msg);
  }

  sendPassworResetEmail(user: User, token: string): void {
    const templateId = this.configService.get('RESET_TEMPLATE_KEY');
    const msg = {
      to: this.configService.get('TEST_EMAIL'),
      from: 'showbiz@movies.test',
      templateId,
      dynamicTemplateData: { jwt: `http://localhost:3000/password/set?token=${token}` },
    };
    sgMail.send(msg);
  }
}
