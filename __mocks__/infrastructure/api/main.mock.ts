import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { AllExceptionsFilter } from '@infrastructure/api/utils/exception.filter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

export const createMockApp = async (
  moduleConfig: ModuleMetadata
): Promise<{
  moduleFixture: TestingModule;
  app: NestFastifyApplication;
}> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    providers: moduleConfig.providers,
    imports: [...moduleConfig.imports, DatabaseModule],
  }).compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return { moduleFixture, app };
};
