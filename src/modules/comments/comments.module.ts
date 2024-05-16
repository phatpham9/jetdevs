import { Module } from '@nestjs/common';

import { PrismaService } from '../common/prisma/prisma.service';

import { CommentsService } from './comments.service';

@Module({
  providers: [PrismaService, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
