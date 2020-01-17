import { IsDefined, IsString } from 'class-validator';

export class ResetTokenDto {
  @IsDefined()
  @IsString()
  jwt: string;
}
