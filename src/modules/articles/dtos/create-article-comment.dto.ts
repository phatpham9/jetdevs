import { OmitType } from '@nestjs/swagger';

import { CreateCommentDto } from '../../comments/dtos/create-comment.dto';

export class CreateArticleCommentDto extends OmitType(CreateCommentDto, [
  'articleId',
]) {}
