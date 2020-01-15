import { IsOptional } from 'class-validator';

export class GetMovieDto {
  @IsOptional()
  sort: string;
  @IsOptional()
  filter: string;
  @IsOptional()
  tags: string;
  @IsOptional()
  query: string;
}
