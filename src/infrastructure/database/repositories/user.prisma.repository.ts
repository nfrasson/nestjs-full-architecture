import { User, PrismaClient } from '@prisma/client';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly database: PrismaClient) {}

  async register(user: User): Promise<void> {
    await this.database.user.create({
      data: {
        ...user,
      },
    });
  }

  findByEmail(userEmail: string): Promise<User> {
    return this.database.user.findUnique({
      where: {
        userEmail,
      },
    });
  }
}
