import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { GetAllCommentsQuery } from '../../comments/dtos/get-all-comments.query';

export class GetAllArticleCommentsQuery extends OmitType(GetAllCommentsQuery, [
  'articleId',
  'parentId',
]) {
  @ApiPropertyOptional({
    description: 'Transform comments to tree view',
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  treeView?: boolean;
}
