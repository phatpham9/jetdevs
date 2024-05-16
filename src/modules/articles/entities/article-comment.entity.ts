import { ApiPropertyOptional } from '@nestjs/swagger';

import { Comment } from '../../comments/entities/comment.entity';

export class ArticleComment extends Comment {
  @ApiPropertyOptional({
    description: 'The comment children',
    type: ArticleComment,
    isArray: true,
  })
  comments?: ArticleComment[];
}
