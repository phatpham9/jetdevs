import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { Error } from '../../error/entities/error.entity';

import { Article, ArticleWithoutContent } from './entities/article.entity';
import { ArticleComment } from './entities/article-comment.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { CreateArticleCommentDto } from './dtos/create-article-comment.dto';
import { GetAllArticlesQuery } from './dtos/get-all-articles.query';
import { GetAllArticleCommentsQuery } from './dtos/get-all-article-comments.query';
import { GetArticleParams } from './dtos/get-article.params';
import { ArticlesService } from './articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({
    operationId: 'createArticle',
    description: 'Create an article',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Create article successfully',
    type: Article,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: Error,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: Error,
  })
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'getAllArticles',
    description: 'Get all articles',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all articles successfully',
    type: ArticleWithoutContent,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: Error,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: Error,
  })
  async getAll(
    @Query() getAllArticlesQuery: GetAllArticlesQuery,
  ): Promise<ArticleWithoutContent[]> {
    return this.articlesService.getAll(getAllArticlesQuery);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getArticle',
    description: 'Get an article by ID',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get article by ID successfully',
    type: ArticleWithoutContent,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: Error,
  })
  @ApiNotFoundResponse({
    description: 'Article not found',
    type: Error,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: Error,
  })
  async get(@Param() { id }: GetArticleParams): Promise<ArticleWithoutContent> {
    return this.articlesService.get(id);
  }

  @Get(':id/content')
  @ApiOperation({
    operationId: 'getArticleContent',
    description: 'Get an article content by ID',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get article content by ID successfully',
    type: String,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: Error,
  })
  @ApiNotFoundResponse({
    description: 'Article not found',
    type: Error,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: Error,
  })
  async getContent(@Param() { id }: GetArticleParams): Promise<string> {
    return this.articlesService.getContent(id);
  }

  @Post(':id/comments')
  @ApiOperation({
    operationId: 'createArticleComment',
    description: 'Create an article comment',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Create article comment successfully',
    type: ArticleComment,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: Error,
  })
  @ApiNotFoundResponse({
    description: 'Article not found',
    type: Error,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: Error,
  })
  async createComment(
    @Param() { id }: GetArticleParams,
    @Body() createArticleCommentDto: CreateArticleCommentDto,
  ): Promise<ArticleComment> {
    return this.articlesService.createComment(id, createArticleCommentDto);
  }

  @Get(':id/comments')
  @ApiOperation({
    operationId: 'getAllArticleComments',
    description: 'Get all article comments',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all article comments successfully',
    type: ArticleComment,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: Error,
  })
  @ApiNotFoundResponse({
    description: 'Article not found',
    type: Error,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: Error,
  })
  async getAllComments(
    @Param() { id }: GetArticleParams,
    @Query() getAllArticleCommentsQuery: GetAllArticleCommentsQuery,
  ): Promise<ArticleComment[]> {
    return this.articlesService.getAllComments(id, getAllArticleCommentsQuery);
  }
}
