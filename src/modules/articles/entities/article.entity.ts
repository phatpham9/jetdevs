import { ApiProperty, OmitType } from '@nestjs/swagger';

export class Article {
  @ApiProperty({
    description: 'The article ID',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The article nickname',
    type: String,
    example: 'John Doe',
  })
  nickname: string;

  @ApiProperty({
    description: 'The article title',
    type: String,
    example: 'Hello world',
  })
  title: string;

  @ApiProperty({
    description: 'The article content',
    type: String,
    example: 'Hello world',
  })
  content: string;

  @ApiProperty({
    description: 'The article creation date',
    type: Date,
    format: 'date-time',
    example: new Date(),
  })
  creationDate: Date;
}

export class ArticleWithoutContent extends OmitType(Article, ['content']) {}
