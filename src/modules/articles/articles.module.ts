import { Module } from '@nestjs/common';

import { PrismaService } from '../common/prisma/prisma.service';
import { CommentsModule } from '../comments/comments.module';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';

@Module({
  imports: [CommentsModule],
  controllers: [ArticlesController],
  providers: [PrismaService, ArticlesService],
})
export class ArticlesModule {}
