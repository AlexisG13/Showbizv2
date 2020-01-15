import { IsDefined, IsNumber, IsNotEmpty } from 'class-validator';

export class OrderDetailDto {
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
