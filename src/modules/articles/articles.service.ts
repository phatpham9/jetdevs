import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../common/prisma/prisma.service';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/entities/comment.entity';

import { Article, ArticleWithoutContent } from './entities/article.entity';
import { ArticleComment } from './entities/article-comment.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { CreateArticleCommentDto } from './dtos/create-article-comment.dto';
import { GetAllArticlesQuery } from './dtos/get-all-articles.query';
import { GetAllArticleCommentsQuery } from './dtos/get-all-article-comments.query';

@Injectable()
export class ArticlesService {
  constructor(
    private prismaService: PrismaService,
    private commentsService: CommentsService,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.prismaService.article.create({
      data: createArticleDto,
    });
  }

  async getAll(
    getAllArticlesQuery: GetAllArticlesQuery = {},
  ): Promise<ArticleWithoutContent[]> {
    const { offset = 0, limit = 20 } = getAllArticlesQuery;

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

  async createComment(
    id: number,
    createArticleCommentDto: CreateArticleCommentDto,
  ): Promise<ArticleComment> {
    const article = await this.prismaService.article.findUnique({
      where: { id },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return this.commentsService.create({
      articleId: id,
      ...createArticleCommentDto,
    });
  }

  async getAllComments(
    id: number,
    getAllArticleCommentsQuery: GetAllArticleCommentsQuery = {},
  ): Promise<ArticleComment[]> {
    const { treeView = false } = getAllArticleCommentsQuery;

    const article = await this.prismaService.article.findUnique({
      where: { id },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const comments = await this.commentsService.getAll({
      articleId: id,
    });
    if (!treeView) {
      return comments;
    }

    return this.buildCommentTree(comments);
  }

  private buildCommentTree(
    comments: Comment[],
    parentId?: number,
  ): ArticleComment[] {
    const tree = [];

    for (const comment of comments) {
      if (comment.parentId === (parentId || null)) {
        tree.push({
          ...comment,
          comments: this.buildCommentTree(comments, comment.id),
        });
      }
    }

    return tree;
  }
}
