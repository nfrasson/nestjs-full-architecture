import { UserService } from './user.service';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginUserInputDto, RegisterUserInputDto, LoginUserResponseDto, RegisterUserResponseDto } from '../dto/index';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() body: LoginUserInputDto): Promise<LoginUserResponseDto> {
    return await this.userService.loginUser(body);
  }

  @Post('register')
  @HttpCode(201)
  async registerUser(@Body() body: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    return await this.userService.registerUser(body);
  }
}
