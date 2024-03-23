import { FastifyInstance } from 'fastify';
import { UserController } from '@infrastructure/api/controllers/user.controller';
import { LoginUserInputDto } from '@application/usecases/user/login-user.use-case';
import { RegisterUserInputDto } from '@application/usecases/user/register-user.use-case';

const controller = new UserController();

export function registerUserRoutes(fastify: FastifyInstance): void {
  fastify.post('/user/login', request => {
    return controller.loginUser(request.body as LoginUserInputDto);
  });

  fastify.post('/user/register', async request => {
    return controller.registerUser(request.body as RegisterUserInputDto);
  });
}
