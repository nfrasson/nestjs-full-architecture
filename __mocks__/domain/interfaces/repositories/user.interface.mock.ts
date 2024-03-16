import { IUserRepository } from '@domain/interfaces/repositories/user.interface';

export const userRepositoryMock: jest.Mocked<IUserRepository> = {
  register: jest.fn(),
  findByEmail: jest.fn(),
};
