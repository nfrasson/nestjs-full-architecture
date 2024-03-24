import 'reflect-metadata';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import Fastify, { FastifyInstance } from 'fastify';
import { ExceptionFilter } from '@infrastructure/api/utils/exception.filter.util';

export function mockApp(): FastifyInstance {
  const fastify = Fastify();

  fastify.register(cors);
  fastify.register(helmet);

  const excepctionFilter = new ExceptionFilter();

  fastify.setErrorHandler((error, request, reply) => {
    const { statusCode, errorResponse } = excepctionFilter.catch(error, { method: request.method, url: request.url });
    reply.status(statusCode).send(errorResponse);
  });

  return fastify;
}
