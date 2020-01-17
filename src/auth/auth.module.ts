import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/repositories/user.repository';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { JWT } from '../users/entities/jwt.entity';
import { Role } from '../users/entities/role.entity';
import { EmailModule } from '../email/email.module';
import { ResetToken } from './entities/password-jwt.entity';
import { JwtResetStrategy } from './reset-password.stategy';

@Module({
  providers: [JwtStrategy, AuthService, JwtResetStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UsersRepository, JWT, Role, ResetToken]),
    EmailModule,
  ],
  exports: [JwtStrategy, AuthService, JwtResetStrategy],
})
export class AuthModule {}
