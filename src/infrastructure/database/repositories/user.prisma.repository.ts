import { User, PrismaClient } from '@prisma/client';
import { User as DomainUser } from '@domain/entities/user.entity';
import { IUserRepository } from '@domain/interfaces/repositories/user.interface';

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly database: PrismaClient) {}

  private static mapRepositoryUserToDomainUser(repositoryUser: User): DomainUser {
    return new DomainUser({
      userId: repositoryUser.user_id,
      userEmail: repositoryUser.user_email,
      userFirstname: repositoryUser.user_firstname,
      userLastname: repositoryUser.user_lastname,
      userPassword: repositoryUser.user_password,
    });
  }

  async register(user: DomainUser): Promise<void> {
    await this.database.user.create({
      data: {
        user_id: user.userId,
        user_email: user.userEmail,
        user_firstname: user.userFirstname,
        user_lastname: user.userLastname,
        user_password: user.userPassword,
      },
    });
  }

  async findByEmail(userEmail: string): Promise<DomainUser> {
    const repositoryUser: User = await this.database.user.findUnique({
      where: {
        user_email: userEmail,
      },
    });

    if (!repositoryUser) {
      return null;
    }

    return UserPrismaRepository.mapRepositoryUserToDomainUser(repositoryUser);
  }
}
