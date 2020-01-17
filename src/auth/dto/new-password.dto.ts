import { IsDefined, IsString } from 'class-validator';

export class NewPasswordDto {
  @IsDefined()
  @IsString()
  newPassword: string;
  @IsDefined()
  @IsString()
  newPasswordValidation: string;
}
