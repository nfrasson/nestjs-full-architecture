import { User } from '@prisma/client';

export interface IUserRepository {
  register(user: User): Promise<void>;
  findByEmail(userEmail: string): Promise<User | null>;
}
