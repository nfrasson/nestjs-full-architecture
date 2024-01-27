import { DefaultController } from '@/default.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('DefaultController', () => {
  let controller: DefaultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultController],
    }).compile();

    controller = module.get<DefaultController>(DefaultController);
  });

  it('should return a 204 status for healthCheck', () => {
    expect(controller.healthCheck()).toBeUndefined();
  });
});
