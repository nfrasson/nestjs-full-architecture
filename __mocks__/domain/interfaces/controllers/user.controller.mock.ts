import { IUserController } from '@domain/interfaces/controllers/user.controller.interface';

export const mockUserController: jest.Mocked<IUserController> = {
  loginUser: jest.fn(),
  registerUser: jest.fn(),
};
