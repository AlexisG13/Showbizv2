import { IsDefined, IsArray, ValidateNested } from 'class-validator';
import { OrderDetailDto } from './order-detail.dto';
import { Type } from 'class-transformer';

export class OrderDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  details: OrderDetailDto[];
}
