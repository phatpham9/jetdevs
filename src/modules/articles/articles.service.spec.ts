import { Test, TestingModule } from '@nestjs/testing';
import { Article } from '@prisma/client';

import { PrismaService } from '../common/prisma/prisma.service';
import { CommentsService } from '../comments/comments.service';

import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let prismaService: PrismaService;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ArticlesService, CommentsService],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    prismaService = module.get<PrismaService>(PrismaService);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  describe('create', () => {
    it('should create an article', async () => {
      const createArticleDto = {
        nickname: 'Nickname',
        title: 'Title',
        content: 'Content',
      };
      const article = {
        id: 1,
        nickname: 'Nickname',
        title: 'Title',
        content: 'Content',
        creationDate: new Date(),
      };
      jest.spyOn(prismaService.article, 'create').mockResolvedValue(article);

      await expect(service.create(createArticleDto)).resolves.toBe(article);
      expect(prismaService.article.create).toHaveBeenCalledWith({
        data: createArticleDto,
      });
    });
  });

  describe('getAll', () => {
    const articles = [
      {
        id: 1,
        nickname: 'Nickname',
        title: 'Title',
        creationDate: new Date(),
      },
    ];

    beforeEach(() => {
      jest
        .spyOn(prismaService.article, 'findMany')
        .mockResolvedValue(articles as Article[]);
    });

    it('should get all articles with offset and limit', async () => {
      await expect(
        service.getAll({
          offset: 0,
          limit: 10,
        }),
      ).resolves.toBe(articles);
      expect(prismaService.article.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        select: {
          id: true,
          nickname: true,
          title: true,
          creationDate: true,
        },
      });
    });

    it('should get all articles with GetAllArticlesQuery is null', async () => {
      await expect(service.getAll()).resolves.toBe(articles);
      expect(prismaService.article.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 20,
        select: {
          id: true,
          nickname: true,
          title: true,
          creationDate: true,
        },
      });
    });

    it('should get all articles with offset and limit are null', async () => {
      await expect(service.getAll({})).resolves.toBe(articles);
      expect(prismaService.article.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 20,
        select: {
          id: true,
          nickname: true,
          title: true,
          creationDate: true,
        },
      });
    });
  });

  describe('get', () => {
    it('should get an article', async () => {
      const article = {
        id: 1,
        nickname: 'Nickname',
        title: 'Title',
        creationDate: new Date(),
      };
      jest
        .spyOn(prismaService.article, 'findUnique')
        .mockResolvedValue(article as Article);

      await expect(service.get(1)).resolves.toBe(article);
      expect(prismaService.article.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: {
          id: true,
          nickname: true,
          title: true,
          creationDate: true,
        },
      });
    });

    it('should throw NotFoundException when article not found', async () => {
      jest.spyOn(prismaService.article, 'findUnique').mockResolvedValue(null);

      await expect(service.get(1)).rejects.toThrow('Article not found');
    });
  });

  describe('getContent', () => {
    it('should get an article content', async () => {
      const article = {
        id: 1,
        content: 'Content',
      };
      jest
        .spyOn(prismaService.article, 'findUnique')
        .mockResolvedValue(article as Article);

      await expect(service.getContent(1)).resolves.toBe('Content');
      expect(prismaService.article.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: {
          content: true,
        },
      });
    });

    it('should throw NotFoundException when article not found', async () => {
      jest.spyOn(prismaService.article, 'findUnique').mockResolvedValue(null);

      await expect(service.getContent(1)).rejects.toThrow('Article not found');
    });
  });

  describe('createComment', () => {
    const article = {
      id: 1,
      nickname: 'Nickname',
      title: 'Title',
      content: 'Content',
      creationDate: new Date(),
    };
    const comment = {
      id: 1,
      nickname: 'Nickname',
      content: 'Content',
      creationDate: new Date(),
      articleId: article.id,
      parentId: 1,
    };
    const createArticleCommentDto = {
      nickname: 'Nickname',
      content: 'Content',
      parentId: 1,
    };

    it('should create an article comment', async () => {
      jest
        .spyOn(prismaService.article, 'findUnique')
        .mockResolvedValue(article);
      jest.spyOn(commentsService, 'create').mockResolvedValue(comment);

      await expect(
        service.createComment(article.id, createArticleCommentDto),
      ).resolves.toBe(comment);
      expect(prismaService.article.findUnique).toHaveBeenCalledWith({
        where: { id: article.id },
      });
      expect(commentsService.create).toHaveBeenCalledWith({
        articleId: article.id,
        ...createArticleCommentDto,
      });
    });

    it('should throw NotFoundException when article not found', async () => {
      jest.spyOn(prismaService.article, 'findUnique').mockResolvedValue(null);

      await expect(service.getContent(1)).rejects.toThrow('Article not found');
    });
  });

  describe('getAllComments', () => {
    const article = {
      id: 1,
      nickname: 'Nickname',
      title: 'Title',
      content: 'Content',
      creationDate: new Date(),
    };
    const comments = [
      {
        id: 1,
        nickname: 'Nickname',
        content: 'Content',
        creationDate: new Date(),
        articleId: article.id,
        parentId: 1,
        comments: [],
      },
    ];

    beforeEach(() => {
      jest.spyOn(commentsService, 'getAll').mockResolvedValue(comments);
      jest.spyOn(service as any, 'buildCommentTree').mockReturnValue(comments);
    });

    it('should get all article comments with treeView is true', async () => {
      jest
        .spyOn(prismaService.article, 'findUnique')
        .mockResolvedValue(article);

      await expect(
        service.getAllComments(article.id, { treeView: true }),
      ).resolves.toBe(comments);
      expect(prismaService.article.findUnique).toHaveBeenCalledWith({
        where: { id: article.id },
      });
      expect(commentsService.getAll).toHaveBeenCalledWith({
        articleId: article.id,
      });
      expect(service['buildCommentTree']).toHaveBeenCalledWith(comments);
    });

    it('should get all article comments with treeView is null', async () => {
      jest
        .spyOn(prismaService.article, 'findUnique')
        .mockResolvedValue(article);

      await expect(service.getAllComments(article.id, {})).resolves.toBe(
        comments,
      );
      expect(prismaService.article.findUnique).toHaveBeenCalledWith({
        where: { id: article.id },
      });
      expect(commentsService.getAll).toHaveBeenCalledWith({
        articleId: article.id,
      });
      expect(service['buildCommentTree']).not.toHaveBeenCalled();
    });

    it('should get all article comments with GetAllArticleCommentsQuery is null', async () => {
      jest
        .spyOn(prismaService.article, 'findUnique')
        .mockResolvedValue(article);

      await expect(service.getAllComments(article.id)).resolves.toBe(comments);
      expect(prismaService.article.findUnique).toHaveBeenCalledWith({
        where: { id: article.id },
      });
      expect(commentsService.getAll).toHaveBeenCalledWith({
        articleId: article.id,
      });
      expect(service['buildCommentTree']).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when article not found', async () => {
      jest.spyOn(prismaService.article, 'findUnique').mockResolvedValue(null);

      await expect(service.getContent(1)).rejects.toThrow('Article not found');
    });
  });

  describe('buildCommentTree', () => {
    it('should build comment tree', () => {
      const comments = [
        {
          id: 1,
          nickname: 'Nickname',
          content: 'Content',
          creationDate: new Date(),
          articleId: 1,
          parentId: null,
        },
        {
          id: 2,
          nickname: 'Nickname',
          content: 'Content',
          creationDate: new Date(),
          articleId: 1,
          parentId: 1,
        },
        {
          id: 3,
          nickname: 'Nickname',
          content: 'Content',
          creationDate: new Date(),
          articleId: 1,
          parentId: 2,
        },
      ];
      const expected = [
        {
          id: 1,
          nickname: 'Nickname',
          content: 'Content',
          creationDate: new Date(),
          articleId: 1,
          parentId: null,
          comments: [
            {
              id: 2,
              nickname: 'Nickname',
              content: 'Content',
              creationDate: new Date(),
              articleId: 1,
              parentId: 1,
              comments: [
                {
                  id: 3,
                  nickname: 'Nickname',
                  content: 'Content',
                  creationDate: new Date(),
                  articleId: 1,
                  parentId: 2,
                  comments: [],
                },
              ],
            },
          ],
        },
      ];

      expect(service['buildCommentTree'](comments)).toEqual(expected);
    });
  });
});
