import { Module } from '@nestjs/common';

import { PrismaService } from '../common/prisma/prisma.service';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';

@Module({
  controllers: [ArticlesController],
  providers: [PrismaService, ArticlesService],
})
export class ArticlesModule {}
