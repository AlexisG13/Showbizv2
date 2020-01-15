import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { Order } from 'src/users/entities/order.entity ';
import { Rental } from 'src/users/entities/rental.entity';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey('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');
  }

  sendTransactionEmail(user: User, transaction: Order | Rental, type: string): void {
    const templateId = 'd-2f7c7a6e8c31405b837d8bf9977435a1';
    let devolutionDate;
    if (type === 'rental') {
      devolutionDate = (transaction as Rental).devolutionDate.toDateString;
    }
    const msg = {
      to: 'gomezalexisj13@gmail.com',
      from: 'showbiz_movies@test.org',
      subject: 'Check your latest order details!',
      templateId,
      dynamicTemplateData: { ...transaction, devolutionDate, username: user.username, type },
    };
    sgMail.send(msg);
  }
}
