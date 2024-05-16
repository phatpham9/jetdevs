import { Test, TestingModule } from '@nestjs/testing';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            get: jest.fn(),
            getContent: jest.fn(),
            createComment: jest.fn(),
            getAllComments: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  describe('create', () => {
    it('should create an article', async () => {
      const article = {
        id: 1,
        nickname: 'Nickname',
        title: 'Title',
        content: 'Content',
        creationDate: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(article);

      await expect(
        controller.create({
          nickname: 'Nickname',
          title: 'Title',
          content: 'Content',
        }),
      ).resolves.toBe(article);
      expect(service.create).toHaveBeenCalledWith({
        nickname: 'Nickname',
        title: 'Title',
        content: 'Content',
      });
    });
  });

  describe('getAll', () => {
    it('should get all articles', async () => {
      const articles = [
        {
          id: 1,
          nickname: 'Nickname',
          title: 'Title',
          creationDate: new Date(),
        },
      ];
      jest.spyOn(service, 'getAll').mockResolvedValue(articles);

      await expect(controller.getAll({ offset: 0, limit: 10 })).resolves.toBe(
        articles,
      );
      expect(service.getAll).toHaveBeenCalledWith({ offset: 0, limit: 10 });
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
      jest.spyOn(service, 'get').mockResolvedValue(article);

      await expect(controller.get({ id: 1 })).resolves.toBe(article);
      expect(service.get).toHaveBeenCalledWith(1);
    });
  });

  describe('getContent', () => {
    it('should get an article content', async () => {
      const content = 'Content';
      jest.spyOn(service, 'getContent').mockResolvedValue(content);

      await expect(controller.getContent({ id: 1 })).resolves.toBe(content);
      expect(service.getContent).toHaveBeenCalledWith(1);
    });
  });

  describe('createComment', () => {
    it('should create an article comment', async () => {
      const articleId = 1;
      const parentId = 1;
      const comment = {
        id: 1,
        nickname: 'Nickname',
        content: 'Content',
        creationDate: new Date(),
        articleId,
        parentId,
      };
      jest.spyOn(service, 'createComment').mockResolvedValue(comment);

      await expect(
        controller.createComment(
          { id: articleId },
          {
            nickname: 'Nickname',
            content: 'Content',
            parentId,
          },
        ),
      ).resolves.toBe(comment);
      expect(service.createComment).toHaveBeenCalledWith(articleId, {
        nickname: 'Nickname',
        content: 'Content',
        parentId,
      });
    });
  });

  describe('getAllComments', () => {
    it('should get all article comments', async () => {
      const articleId = 1;
      const parentId = 1;
      const comments = [
        {
          id: 1,
          nickname: 'Nickname',
          content: 'Content',
          creationDate: new Date(),
          articleId,
          parentId,
        },
      ];
      jest.spyOn(service, 'getAllComments').mockResolvedValue(comments);

      await expect(
        controller.getAllComments({ id: articleId }, { treeView: true }),
      ).resolves.toBe(comments);
      expect(service.getAllComments).toHaveBeenCalledWith(articleId, {
        treeView: true,
      });
    });
  });
});
