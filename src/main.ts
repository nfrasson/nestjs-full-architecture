import helmet from "@fastify/helmet";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: { level: "warn" } })
  );

  app.enableCors();
  app.register(helmet);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000, "0.0.0.0");
}
bootstrap();
