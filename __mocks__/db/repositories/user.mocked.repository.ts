import { User } from '@/User/user.entity';
import { IUserRepository } from '@/interfaces/user.interface';
import { mockUser } from '@mocks/User/user.entity.mock';

export class UserRepositoryMock implements IUserRepository {
  async register(): Promise<void> {
    return;
  }

  async findByEmail(): Promise<User> {
    return mockUser();
  }
}
