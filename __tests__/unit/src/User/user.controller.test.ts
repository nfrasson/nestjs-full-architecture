import { UserService } from '@/User/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@/User/user.controller';
import { mockUser } from '@mocks/User/user.entity.mock';

describe('UserController', () => {
  let userService: UserService;
  let controller: UserController;

  beforeEach(async () => {
    const mockUserService = {
      loginUser: jest.fn(),
      registerUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    userService = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should call UserService.loginUser with the correct parameters', async () => {
    const userDto = mockUser();
    await controller.loginUser(userDto);
    expect(userService.loginUser).toHaveBeenCalledWith(userDto);
  });

  it('should call UserService.registerUser with the correct parameters', async () => {
    const userDto = mockUser();
    await controller.registerUser(userDto);
    expect(userService.registerUser).toHaveBeenCalledWith(userDto);
  });
});
