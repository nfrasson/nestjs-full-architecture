import { UserService } from './user.service';
import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserInputDto, RegisterUserInputDto, LoginUserResponseDto, RegisterUserResponseDto } from '../dto/index';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async loginUser(@Body() body: LoginUserInputDto): Promise<LoginUserResponseDto> {
    return await this.userService.loginUser(body);
  }

  @Post('register')
  async registerUser(@Body() body: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    return await this.userService.registerUser(body);
  }
}
