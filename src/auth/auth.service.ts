import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/repositories/user.repository';
import { AuthCredentialsDto } from '../auth/dto/auth.credentials.dto';
import { AccessToken } from '../users/dto/access-token.dto';
import { PasswordChangeDto } from '../users/dto/password-change.dto';
import { User } from '../users/entities/users.entity';
import { JWT } from '../users/entities/jwt.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { Role } from '../users/entities/role.entity';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { EmailService } from '../email/email.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetToken } from './entities/password-jwt.entity';
import { NewPasswordDto } from './dto/new-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(JWT)
    private readonly jwtRepository: Repository<JWT>,
    private readonly emailService: EmailService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(ResetToken)
    private readonly resetTokenRepository: Repository<ResetToken>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const role = await this.roleRepository.findOne({ title: 'client' });
    if (!role) {
      throw new NotFoundException('Role does not exist');
    }
    return this.usersRepository.signUp(authCredentialsDto, role);
  }

  async login(loginCredentials: LoginCredentialsDto): Promise<AccessToken> {
    const user = await this.usersRepository.validatePassword(loginCredentials);
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    this.jwtRepository.save({ user, jwt: accessToken });
    return { token: accessToken };
  }

  async logout(token: string): Promise<void> {
    await this.jwtRepository.delete({ jwt: token });
  }

  async changePassword(user: User, passwordDto: PasswordChangeDto): Promise<void> {
    return this.usersRepository.changePassword(user, passwordDto);
  }

  async sendPasswordReset(resetPassword: ResetPasswordDto): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email: resetPassword.email } });
    if (!user) {
      return;
    }
    const oldResetToken = await this.resetTokenRepository.findOne({ where: { user } });
    if (oldResetToken) {
      await this.resetTokenRepository.delete(oldResetToken);
    }
    const resetToken = sign({ username: user.username }, 'reset-secret', { expiresIn: 3600 });
    this.resetTokenRepository.save({ jwt: resetToken, user });
    this.emailService.sendPassworResetEmail(user, resetToken);
    return;
  }

  async resetPassword(user: User, newPassword: NewPasswordDto, token: string): Promise<void> {
    if (newPassword.newPassword !== newPassword.newPasswordValidation) {
      throw new BadRequestException(`The passwords don't match`);
    }
    await this.usersRepository.resetPassword(user.id, newPassword.newPasswordValidation);
    this.resetTokenRepository.delete({ jwt: token });
  }
}
