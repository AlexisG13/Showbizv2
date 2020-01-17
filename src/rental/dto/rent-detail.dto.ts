import { IsDefined, IsNumber, IsNotEmpty } from 'class-validator';

export class RentDetailDto {
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  movieId: number;
}
