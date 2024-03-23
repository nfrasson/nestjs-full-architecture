import 'reflect-metadata';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { registerUserRoutes } from './fastify/controllers/user.fastify.controller';

const fastify = Fastify({ logger: { level: 'warn' } });

fastify.register(cors);
fastify.register(helmet);

registerUserRoutes(fastify);

fastify.setErrorHandler((error, _request, reply) => {
  console.error(error);
  reply.status(500).send({ error: 'Internal Server Error' });
});

const start = (): void => {
  try {
    fastify.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' });
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
