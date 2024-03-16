import {
  LoginUserInputDto,
  RegisterUserInputDto,
  LoginUserResponseDto,
  RegisterUserResponseDto,
} from '@application/dto/user';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginUserUseCase, RegisterUserUseCase } from '@application/usecases/user';

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
