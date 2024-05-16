import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllCommentsQuery {
  @ApiPropertyOptional({
    description: 'Get all comments by article ID',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  articleId?: number;

  @ApiPropertyOptional({
    description: 'Get all comments by parent ID',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  parentId?: number;
}
