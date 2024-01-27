import { User } from "@prisma/client";
import { IUserRepository } from "@/interfaces/user.interface";
import { PrismaService } from "../prisma.service";

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        ...user,
      },
    });
  }

  async findByID(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });
    return user;
  }

  async update(user: User, userId: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        userId,
      },
      data: {
        ...user,
      },
    });
  }

  async findByEmail(userEmail: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        userEmail,
      },
    });
    return user;
  }
}
