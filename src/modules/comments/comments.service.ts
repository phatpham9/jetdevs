import { Injectable, BadRequestException } from '@nestjs/common';

import { PrismaService } from '../common/prisma/prisma.service';

import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { GetAllCommentsQuery } from './dtos/get-all-comments.query';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    if (createCommentDto.parentId) {
      const parent = await this.prismaService.comment.findUnique({
        where: { id: createCommentDto.parentId },
      });
      if (!parent) {
        throw new BadRequestException('Parent comment not found');
      }
    }

    return this.prismaService.comment.create({
      data: createCommentDto,
    });
  }

  async getAll(
    getAllCommentsQuery: GetAllCommentsQuery = {},
  ): Promise<Comment[]> {
    return this.prismaService.comment.findMany({
      where: getAllCommentsQuery,
    });
  }
}
