import { IContainerDI } from '@domain/interfaces/config/container.di.interface';
import { registerUserDependencies } from '@infrastructure/config/di/user/user.di';
import { LoginUserUseCase, RegisterUserUseCase } from '@application/usecases/user';
import { IUserController } from '@domain/interfaces/controllers/user.controller.interface';
import { LoginUserInputDto, LoginUserResponseDto } from '@application/usecases/user/login-user.use-case';
import { RegisterUserInputDto, RegisterUserResponseDto } from '@application/usecases/user/register-user.use-case';

export class UserController implements IUserController {
  private readonly loginUseCase: LoginUserUseCase;
  private readonly registerUseCase: RegisterUserUseCase;

  constructor(private readonly container: IContainerDI) {
    registerUserDependencies(container);

    this.loginUseCase = this.container.resolve<LoginUserUseCase>('LoginUserUseCase');
    this.registerUseCase = this.container.resolve<RegisterUserUseCase>('RegisterUserUseCase');
  }

  loginUser(requestBody: LoginUserInputDto): Promise<LoginUserResponseDto> {
    return this.loginUseCase.execute(requestBody);
  }

  registerUser(requestBody: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    return this.registerUseCase.execute(requestBody);
  }
}
