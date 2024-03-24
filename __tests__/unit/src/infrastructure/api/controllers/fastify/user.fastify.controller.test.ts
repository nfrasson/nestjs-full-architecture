import { FastifyInstance } from 'fastify';
import { mockUserController } from '@mocks/domain/interfaces/controllers/user.controller.mock';
import { UserFastifyController } from '@infrastructure/api/controllers/fastify/user.fastify.controller';
import { mockLoginUserInputDto } from '@mocks/application/usecases/user/login.use-case.mock';
import { mockRegisterUserInputDto } from '@mocks/application/usecases/user/register.use-case.mock';

jest.mock('fastify');

describe('UserFastifyController', () => {
  let userFastifyController: UserFastifyController;
  const mockFastifyInstance: jest.Mocked<FastifyInstance> = {
    post: jest.fn(),
  } as unknown as jest.Mocked<FastifyInstance>;

  beforeEach(() => {
    userFastifyController = new UserFastifyController(mockUserController);
  });

  it('should register routes correctly', () => {
    userFastifyController.registerRoutes(mockFastifyInstance);

    expect(mockFastifyInstance.post).toHaveBeenCalledTimes(2);
    expect(mockFastifyInstance.post).toHaveBeenCalledWith('/user/login', expect.any(Function));
    expect(mockFastifyInstance.post).toHaveBeenCalledWith('/user/register', expect.any(Function));

    const loginHandler = (mockFastifyInstance.post as jest.Mock).mock.calls[0][1];
    loginHandler({ body: mockLoginUserInputDto });

    const registerHandler = (mockFastifyInstance.post as jest.Mock).mock.calls[1][1];
    registerHandler({ body: mockRegisterUserInputDto });

    expect(mockUserController.loginUser).toHaveBeenCalledWith(mockLoginUserInputDto);
    expect(mockUserController.registerUser).toHaveBeenCalledWith(mockRegisterUserInputDto);
  });
});
