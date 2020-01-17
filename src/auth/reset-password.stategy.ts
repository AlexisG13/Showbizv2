import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { User } from 'src/users/entities/users.entity';
import { Payload } from 'src/users/dto/payload-dto';

@Injectable()
export class JwtResetStrategy extends PassportStrategy(Strategy, 'jwt-reset') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: 'reset-secret',
    });
  }

  async validate(payload: Payload): Promise<User> {
    const { username } = payload;
    const user = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    return user;
  }
}
