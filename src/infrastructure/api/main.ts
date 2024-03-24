import 'reflect-metadata';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { Logger } from './utils/logger.util';
import { ExceptionFilter } from './utils/exception.filter';
import { registerUserRoutes } from './fastify/controllers/user.fastify.controller';

const fastify = Fastify();

fastify.register(cors);
fastify.register(helmet);

registerUserRoutes(fastify);

const logger = new Logger('fastify');
const excepctionFilter = new ExceptionFilter();

fastify.setErrorHandler((error, request, reply) => {
  const { statusCode, errorResponse } = excepctionFilter.catch(error, { method: request.method, url: request.url });
  reply.status(statusCode).send(errorResponse);
});

const start = (): void => {
  try {
    fastify.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' });
    logger.log(`Server running at http://0.0.0.0:${process.env.PORT || 3000}`);
  } catch (err) {
    logger.error('Error starting server', err);
    process.exit(1);
  }
};

start();
