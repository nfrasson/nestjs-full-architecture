import { User } from '@domain/entities/user.entity';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';
import { mockUser } from '@mocks/domain/entities/user.entity.mock';

export class UserRepositoryMock implements IUserRepository {
  async register(): Promise<void> {
    return;
  }

  async findByEmail(): Promise<User> {
    return mockUser();
  }
}
