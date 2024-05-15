import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllArticlesQuery {
  @ApiPropertyOptional({
    description: 'The number of articles to skip',
    type: Number,
    default: 0,
  })
  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  offset?: number;

  @ApiPropertyOptional({
    description: 'The number of articles to take',
    type: Number,
    default: 20,
  })
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
