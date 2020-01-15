import { IsDefined, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { OrderDetailDto } from './order-detail.dto';
import { Type } from 'class-transformer';

export class RentDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  details: OrderDetailDto[];
  @IsDefined()
  @IsDateString()
  devolutionDate: Date;
}
