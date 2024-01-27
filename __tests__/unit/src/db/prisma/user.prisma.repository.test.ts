import { PrismaService } from '@/db/prisma/prisma.service';
import { UserPrismaRepository } from '@/db/prisma/repositories/user.prisma.repository';
import { mockUser } from '@mocks/User/user.entity.mock';

describe('UserPrismaRepository', () => {
  let repository: UserPrismaRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    repository = new UserPrismaRepository(prismaService);
  });

  describe('register', () => {
    it('should call prisma.user.create with the correct parameters', async () => {
      const mockedUser = mockUser();
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(undefined);

      await repository.register(mockedUser);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: mockedUser,
      });
    });

    it('should throw an error if prisma.user.create throws an error', async () => {
      const mockedUser = mockUser();
      jest.spyOn(prismaService.user, 'create').mockRejectedValue(new Error());

      await expect(repository.register(mockedUser)).rejects.toThrow();
    });
  });

  describe('findByID', () => {
    it('should call prisma.user.findUnique with the correct parameters', async () => {
      const mockedUser = mockUser();
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockedUser);

      await repository.findByID(mockedUser.userId);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          userId: mockedUser.userId,
        },
      });
    });

    it('should throw an error if prisma.user.findUnique throws an error', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockRejectedValue(new Error());

      await expect(repository.findByID(mockUser().userId)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should call prisma.user.update with the correct parameters', async () => {
      const mockedUser = mockUser();
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(undefined);

      await repository.update(mockedUser, mockedUser.userId);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: {
          userId: mockedUser.userId,
        },
        data: mockedUser,
      });
    });

    it('should throw an error if prisma.user.update throws an error', async () => {
      const mockedUser = mockUser();
      jest.spyOn(prismaService.user, 'update').mockRejectedValue(new Error());

      await expect(repository.update(mockedUser, mockedUser.userId)).rejects.toThrow();
    });
  });

  describe('findByEmail', () => {
    it('should call prisma.user.findUnique with the correct parameters', async () => {
      const mockedUser = mockUser();
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockedUser);

      await repository.findByEmail(mockedUser.userEmail);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          userEmail: mockedUser.userEmail,
        },
      });
    });

    it('should throw an error if prisma.user.findUnique throws an error', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockRejectedValue(new Error());

      await expect(repository.findByEmail(mockUser().userEmail)).rejects.toThrow();
    });
  });
});
