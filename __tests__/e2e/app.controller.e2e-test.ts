import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('/healthcheck (GET)', () => {
    it('should return 204', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/healthcheck',
      });

      expect(response.statusCode).toBe(204);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
