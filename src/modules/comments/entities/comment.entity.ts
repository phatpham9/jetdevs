import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Comment {
  @ApiProperty({
    description: 'The comment ID',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The comment nickname',
    type: String,
    example: 'John Doe',
  })
  nickname: string;

  @ApiProperty({
    description: 'The comment content',
    type: String,
    example: 'Hello world',
  })
  content: string;

  @ApiProperty({
    description: 'The comment creation date',
    type: Date,
    format: 'date-time',
    example: new Date(),
  })
  creationDate: Date;

  @ApiProperty({
    description: 'The comment article ID',
    type: Number,
    example: 1,
  })
  articleId: number;

  @ApiPropertyOptional({
    description: 'The comment parent ID',
    type: Number,
    example: 1,
  })
  parentId?: number | null;
}
