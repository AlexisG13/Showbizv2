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
    let templateId;
    const devolutionDate = 'none';
    if (type === 'order') {
      console.log('im an order!');
      console.log(transaction);
      templateId = 'd-229d267630e24e03be384dc38fdab160';
    }
    const msg = {
      to: 'gomezalexisj13@gmail.com',
      from: 'showbiz_movies@test.org',
      subject: `Check your latest order details!`,
      templateId,
      dynamicTemplateData: { ...transaction, devolutionDate, username: user.username },
    };
    sgMail.send(msg);
  }
}
