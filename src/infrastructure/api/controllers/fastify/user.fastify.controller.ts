import { FastifyInstance } from 'fastify';
import { LoginUserInputDto } from '@application/usecases/user/login-user.use-case';
import { RegisterUserInputDto } from '@application/usecases/user/register-user.use-case';
import { IUserController } from '@domain/interfaces/controllers/user.controller.interface';

export class UserFastifyController {
  constructor(private readonly controller: IUserController) {}

  public registerRoutes(fastify: FastifyInstance): void {
    fastify.post('/user/login', request => {
      return this.controller.loginUser(request.body as LoginUserInputDto);
    });

    fastify.post('/user/register', async request => {
      return this.controller.registerUser(request.body as RegisterUserInputDto);
    });
  }
}
