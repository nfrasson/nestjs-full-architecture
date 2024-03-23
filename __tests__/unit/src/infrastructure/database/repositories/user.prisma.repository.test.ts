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
  let database: DatabaseService;
  let repository: UserPrismaRepository;

  beforeAll(() => {
    database = new DatabaseService();
    repository = new UserPrismaRepository(database);
  });

  describe('register', () => {
    it('should call prisma.user.create with the correct parameters', async () => {
      const mockedUser = mockUser();

      expect(await repository.register(mockedUser)).toBeFalsy();
      expect(mockUserCreate).toHaveBeenCalledWith({
        data: {
          user_id: mockedUser.userId,
          user_firstname: mockedUser.userFirstname,
          user_lastname: mockedUser.userLastname,
          user_email: mockedUser.userEmail,
          user_password: mockedUser.userPassword,
        },
      });
    });
  });

  describe('findByEmail', () => {
    it('should call prisma.user.findUnique with the correct parameters', async () => {
      const mockedUser = mockUser();
      mockUserFindUnique.mockResolvedValue({
        user_id: mockedUser.userId,
        user_firstname: mockedUser.userFirstname,
        user_lastname: mockedUser.userLastname,
        user_email: mockedUser.userEmail,
        user_password: mockedUser.userPassword,
      });

      expect(await repository.findByEmail(mockedUser.userEmail)).toStrictEqual(mockedUser);
      expect(mockUserFindUnique).toHaveBeenCalledWith({
        where: {
          user_email: mockedUser.userEmail,
        },
      });
    });

    it('should return null if user is not found', async () => {
      mockUserFindUnique.mockResolvedValue(null);

      expect(await repository.findByEmail('')).toBeNull();
      expect(mockUserFindUnique).toHaveBeenCalledWith({
        where: {
          user_email: '',
        },
      });
    });
  });
});
