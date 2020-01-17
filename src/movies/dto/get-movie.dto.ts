import { IsOptional } from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class GetMovieDto {
  @ApiProperty({ enum: ['title-asc', 'title-desc', 'likes-asc', 'likes-desc'] })
  @IsOptional()
  sort?: string;
  @ApiHideProperty()
  @IsOptional()
  filter?: string;
  @ApiProperty({ example: 'tag1,tag2,tag3' })
  @IsOptional()
  tags?: string;
  @ApiProperty({ example: 'movieTitle' })
  @IsOptional()
  query?: string;
}
