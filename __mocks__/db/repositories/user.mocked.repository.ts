import { IUserRepository } from '@/interfaces/user.interface';
import { mockUser } from '@mocks/User/user.entity.mock';
import { User } from '@prisma/client';

export class UserRepositoryMock implements IUserRepository {
  async register(): Promise<void> {
    return;
  }

  async findByID(): Promise<User> {
    return mockUser();
  }

  async update(): Promise<void> {
    return;
  }

  async findByEmail(): Promise<User> {
    return mockUser();
  }
}
