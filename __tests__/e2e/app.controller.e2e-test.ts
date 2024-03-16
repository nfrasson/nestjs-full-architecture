import { AppModule } from '@infrastructure/api/app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { createMockApp } from '@mocks/infrastructure/api/main.mock';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    ({ app } = await createMockApp({ imports: [AppModule] }));
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
