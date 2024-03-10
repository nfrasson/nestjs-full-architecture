import { User } from '@prisma/client';
import { IUserRepository } from '@/interfaces/user.interface';
import { DatabaseService } from '@/database/database.service';

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly database: DatabaseService) {
    this.database = new DatabaseService();
  }

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
