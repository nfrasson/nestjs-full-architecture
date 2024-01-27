import { UserService } from "./user.service";
import { Controller, Post, Body } from "@nestjs/common";
import { LoginUserInputDto, RegisterUserInputDto } from "../dto/index";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  async loginUser(@Body() body: LoginUserInputDto) {
    return await this.userService.loginUser(body);
  }

  @Post("register")
  async registerUser(@Body() body: RegisterUserInputDto) {
    return await this.userService.registerUser(body);
  }
}
