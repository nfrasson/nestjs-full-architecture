import { Test, TestingModule } from '@nestjs/testing';
import { mockUser } from '@mocks/domain/entities/user.entity.mock';
import { UserController } from '@infrastructure/api/user/user.controller';
import { LoginUserUseCase, RegisterUserUseCase } from '@application/usecases/user';
import { mockLoginUserResponseDto } from '@mocks/application/usecases/user/login.use-case.mock';
import { mockRegisterUserResponseDto } from '@mocks/application/usecases/user/register.use-case.mock';

describe('UserController', () => {
  let controller: UserController;
  let loginUserUseCase: LoginUserUseCase;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: LoginUserUseCase, useValue: { execute: jest.fn() } },
        { provide: RegisterUserUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    loginUserUseCase = module.get<LoginUserUseCase>(LoginUserUseCase);
    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  describe('loginUser', () => {
    it('should call loginUserUseCase.execute with the correct parameters', async () => {
      const userDto = mockUser();
      const expectedResponse = mockLoginUserResponseDto();

      jest.spyOn(loginUserUseCase, 'execute').mockResolvedValue(expectedResponse);

      expect(await controller.loginUser(userDto)).toEqual(expectedResponse);
      expect(loginUserUseCase.execute).toHaveBeenCalledWith(userDto);
    });
  });

  describe('registerUser', () => {
    it('should call registerUser.excute with the correct parameters', async () => {
      const userDto = mockUser();
      const expectedResponse = mockRegisterUserResponseDto();

      jest.spyOn(registerUserUseCase, 'execute').mockResolvedValue(expectedResponse);

      expect(await controller.registerUser(userDto)).toEqual(expectedResponse);
      expect(registerUserUseCase.execute).toHaveBeenCalledWith(userDto);
    });
  });
});
