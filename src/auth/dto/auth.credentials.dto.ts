import { IsDefined, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsDefined()
  username: string;
  @IsDefined()
  password: string;
  @IsDefined()
  @IsEmail()
  email: string;
}
