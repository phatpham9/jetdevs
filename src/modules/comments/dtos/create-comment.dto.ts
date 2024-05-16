import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The comment nickname',
    type: String,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    description: 'The comment content',
    type: String,
    example: 'Hello world',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The comment article ID',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  articleId: number;

  @ApiPropertyOptional({
    description: 'The comment parent ID',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  parentId?: number;
}
