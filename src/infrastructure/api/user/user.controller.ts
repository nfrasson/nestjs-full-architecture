import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginUserUseCase, RegisterUserUseCase } from '@application/usecases/user';
import { LoginUserInputDto, LoginUserResponseDto } from '@application/usecases/user/login-user.use-case';
import { RegisterUserInputDto, RegisterUserResponseDto } from '@application/usecases/user/register-user.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase
  ) {}

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() body: LoginUserInputDto): Promise<LoginUserResponseDto> {
    return await this.loginUserUseCase.execute(body);
  }

  @Post('register')
  @HttpCode(201)
  async registerUser(@Body() body: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    return await this.registerUserUseCase.execute(body);
  }
}
