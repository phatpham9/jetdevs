import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetArticleParams {
  @ApiProperty({
    description: 'The article ID',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}
