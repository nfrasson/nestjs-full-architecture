import { AppController } from '@/app.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should return a 204 status for healthCheck', () => {
    expect(controller.healthCheck()).toBeUndefined();
  });
});
