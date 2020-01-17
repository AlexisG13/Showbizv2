import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JWT } from 'src/users/entities/jwt.entity';
import { Repository } from 'typeorm';
import { ResetToken } from '../entities/password-jwt.entity';
import { Request } from 'express';

@Injectable()
export class ResetTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(ResetToken)
    private readonly resetTokenRepository: Repository<ResetToken>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.query.token;
    if (!token) {
      throw new BadRequestException('No reset token was provided');
    }
    if (await this.resetTokenRepository.findOne({ jwt: token })) {
      return true;
    }
    return false;
  }
}
