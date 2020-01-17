import { IsDefined, IsArray, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @IsDefined()
  title: string;
  @IsDefined()
  description: string;
  @IsDefined()
  poster: string;
  @IsDefined()
  stock: number;
  @IsDefined()
  trailer: string;
  @IsDefined()
  salePrice: number;
  @IsDefined()
  availability: boolean;
  @IsDefined()
  likes: number;
  @ApiProperty({
    example: [
      'HORROR',
      'ACTION',
      'COMEDY',
      'DRAMA',
      'ROMANCE',
      'ADVENTURE',
      'WESTERN',
      'NOIR',
      'FICTION',
      'ANIMATED',
    ],
  })
  @IsDefined()
  @IsArray()
  @MinLength(1, { each: true })
  tags: string[];
}
