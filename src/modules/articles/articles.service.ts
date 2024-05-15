import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../common/prisma/prisma.service';

import { CreateArticleDto } from './dtos/create-article.dto';
import { GetAllArticlesQuery } from './dtos/get-all-articles.query';
import { Article, ArticleWithoutContent } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(private prismaService: PrismaService) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.prismaService.article.create({
      data: createArticleDto,
    });
  }

  async getAll({ offset = 0, limit = 20 }: GetAllArticlesQuery = {}): Promise<
    ArticleWithoutContent[]
  > {
    return this.prismaService.article.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        nickname: true,
        title: true,
        creationDate: true,
      },
    });
  }

  async get(id: number): Promise<ArticleWithoutContent> {
    const article = await this.prismaService.article.findUnique({
      where: { id },
      select: {
        id: true,
        nickname: true,
        title: true,
        creationDate: true,
      },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async getContent(id: number): Promise<string> {
    const article = await this.prismaService.article.findUnique({
      where: { id },
      select: {
        content: true,
      },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article.content;
  }
}
