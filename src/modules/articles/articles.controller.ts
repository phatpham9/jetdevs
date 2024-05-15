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
import { CreateArticleDto } from './dtos/create-article.dto';
import { GetAllArticlesQuery } from './dtos/get-all-articles.query';
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
    description: 'Created article successfully',
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
    @Query() { offset, limit }: GetAllArticlesQuery,
  ): Promise<ArticleWithoutContent[]> {
    return this.articlesService.getAll({ offset, limit });
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
}
