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
});
