import { IsDefined, IsString, IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;
}
