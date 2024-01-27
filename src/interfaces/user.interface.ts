import { User } from "@prisma/client";

export interface IUserRepository {
  register(user: User): Promise<void>;
  findByID(userId: string): Promise<User | null>;
  findByEmail(userEmail: string): Promise<User | null>;
  update(user: User, userId: string): Promise<void>;
}
