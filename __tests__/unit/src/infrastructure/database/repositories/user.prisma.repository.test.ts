import { mockUser } from '@mocks/domain/entities/user.entity.mock';
import { DatabaseService } from '@infrastructure/database/database.service';
import { UserPrismaRepository } from '@infrastructure/database/repositories/user.prisma.repository';

const mockUserCreate = jest.fn();
const mockUserFindUnique = jest.fn();
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        user: {
          create: mockUserCreate,
          findUnique: mockUserFindUnique,
        },
      };
    }),
  };
});

describe('UserPrismaRepository', () => {
  let repository: UserPrismaRepository;
  let database: DatabaseService;

  beforeAll(() => {
    database = new DatabaseService();
    repository = new UserPrismaRepository(database);
  });

  describe('register', () => {
    it('should call prisma.user.create with the correct parameters', async () => {
      const mockedUser = mockUser();

      expect(await repository.register(mockedUser)).toBeFalsy();
      expect(mockUserCreate).toHaveBeenCalledWith({
        data: mockedUser,
      });
    });
  });

  describe('findByEmail', () => {
    it('should call prisma.user.findUnique with the correct parameters', async () => {
      const mockedUser = mockUser();
      mockUserFindUnique.mockResolvedValue(mockedUser);

      expect(await repository.findByEmail(mockedUser.userEmail)).toBe(mockedUser);
      expect(mockUserFindUnique).toHaveBeenCalledWith({
        where: {
          userEmail: mockedUser.userEmail,
        },
      });
    });
  });
});
