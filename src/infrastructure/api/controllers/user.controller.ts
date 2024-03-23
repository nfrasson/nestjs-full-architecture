import { ContainerDI } from '@infrastructure/config/di/container.di';
import { registerUserDependencies } from '@infrastructure/config/di/user/user.di';
import { LoginUserUseCase, RegisterUserUseCase } from '@application/usecases/user';
import { IUserController } from '@domain/interfaces/controllers/user.controller.interface';
import { LoginUserInputDto, LoginUserResponseDto } from '@application/usecases/user/login-user.use-case';
import { RegisterUserInputDto, RegisterUserResponseDto } from '@application/usecases/user/register-user.use-case';

const container = new ContainerDI();

registerUserDependencies(container);

export class UserController implements IUserController {
  loginUser(requestBody: LoginUserInputDto): Promise<LoginUserResponseDto> {
    const loginUseCase = container.resolve<LoginUserUseCase>('LoginUserUseCase');

    return loginUseCase.execute(requestBody);
  }

  registerUser(requestBody: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    const registerUseCase = container.resolve<RegisterUserUseCase>('RegisterUserUseCase');

    return registerUseCase.execute(requestBody);
  }
}
