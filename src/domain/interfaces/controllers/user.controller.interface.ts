import { LoginUserInputDto, LoginUserResponseDto } from '@application/usecases/user/login-user.use-case';
import { RegisterUserInputDto, RegisterUserResponseDto } from '@application/usecases/user/register-user.use-case';

export interface IUserController {
  loginUser(requestBody: LoginUserInputDto): Promise<LoginUserResponseDto>;
  registerUser(requestBody: RegisterUserInputDto): Promise<RegisterUserResponseDto>;
}
