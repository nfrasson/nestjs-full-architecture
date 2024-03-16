import { User } from '@domain/entities/user.entity';

export interface IUserRepository {
  register(user: User): Promise<void>;
  findByEmail(userEmail: string): Promise<User | null>;
}
