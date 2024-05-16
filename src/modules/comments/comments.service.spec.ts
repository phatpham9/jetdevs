import { Test, TestingModule } from '@nestjs/testing';
import { Comment } from '@prisma/client';

import { PrismaService } from '../common/prisma/prisma.service';

import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, CommentsService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    const createCommentDto = {
      nickname: 'Nickname',
      content: 'Content',
      articleId: 1,
      parentId: 1,
    };
    const comment = {
      id: 1,
      nickname: 'Nickname',
      content: 'Content',
      creationDate: new Date(),
      articleId: 1,
      parentId: 1,
    };

    it('should create an comment', async () => {
      jest
        .spyOn(prismaService.comment, 'findUnique')
        .mockResolvedValue(comment);
      jest.spyOn(prismaService.comment, 'create').mockResolvedValue(comment);

      await expect(service.create(createCommentDto)).resolves.toBe(comment);
      expect(prismaService.comment.findUnique).toHaveBeenCalledWith({
        where: { id: createCommentDto.parentId },
      });
      expect(prismaService.comment.create).toHaveBeenCalledWith({
        data: createCommentDto,
      });
    });

    it('should throw BadRequestException when parent not found', async () => {
      jest.spyOn(prismaService.comment, 'findUnique').mockResolvedValue(null);

      await expect(service.create(createCommentDto)).rejects.toThrow(
        'Parent comment not found',
      );
    });
  });

  describe('getAll', () => {
    const comments = [
      {
        id: 1,
        nickname: 'Nickname',
        content: 'Content',
        creationDate: new Date(),
        articleId: 1,
        parentId: 1,
      },
    ];

    beforeEach(() => {
      jest.spyOn(prismaService.comment, 'findMany').mockResolvedValue(comments);
    });

    it('should get all comments', async () => {
      await expect(service.getAll({ articleId: 1, parentId: 1 })).resolves.toBe(
        comments,
      );
      expect(prismaService.comment.findMany).toHaveBeenCalledWith({
        where: { articleId: 1, parentId: 1 },
      });
    });

    it('should get all comments with GetAllCommentsQuery is null', async () => {
      await expect(service.getAll()).resolves.toBe(comments);
      expect(prismaService.comment.findMany).toHaveBeenCalledWith({
        where: {},
      });
    });
  });
});
