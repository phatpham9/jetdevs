import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'The article nickname',
    type: String,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    description: 'The article title',
    type: String,
    example: 'Hello world',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The article content',
    type: String,
    example: 'Hello world',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
