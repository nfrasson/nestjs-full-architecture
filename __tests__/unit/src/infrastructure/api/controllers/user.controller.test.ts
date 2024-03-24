import { UserController } from '@infrastructure/api/controllers/user.controller';
import { mockLoginUserInputDto } from '@mocks/application/usecases/user/login.use-case.mock';
import { mockContainerDI } from '@mocks/domain/interfaces/config/container.di.interface.mock';
import { mockRegisterUserInputDto } from '@mocks/application/usecases/user/register.use-case.mock';

jest.mock('@infrastructure/config/di/user/user.di');

describe('UserController', () => {
  describe('loginUser', () => {
    it('should call loginUseCase.execute with requestBody', async () => {
      const loginUseCaseMock = { execute: jest.fn() };
      const requestBody = mockLoginUserInputDto();

      mockContainerDI.resolve.mockReturnValue(loginUseCaseMock);
      const userController = new UserController(mockContainerDI);

      await userController.loginUser(requestBody);

      expect(loginUseCaseMock.execute).toHaveBeenCalledWith(requestBody);
    });
  });

  describe('registerUser', () => {
    it('should call registerUseCase.execute with requestBody', async () => {
      const registerUseCaseMock = { execute: jest.fn() };
      const requestBody = mockRegisterUserInputDto();

      mockContainerDI.resolve.mockReturnValue(registerUseCaseMock);
      const userController = new UserController(mockContainerDI);

      await userController.registerUser(requestBody);

      expect(registerUseCaseMock.execute).toHaveBeenCalledWith(requestBody);
    });
  });
});
