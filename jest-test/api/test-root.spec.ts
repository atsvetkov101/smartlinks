import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../../src/logger/logger.module';
import { LoggerService } from '../../src/logger/logger.service';
import { AppController } from '../../src/entrypoints/api/app/app.controller';
import { AppService } from '../../src/entrypoints/api/app/app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [AppController],
      providers: [AppService, LoggerService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', async () => {
      jest.spyOn(appService, 'getHello').mockImplementation(() => 'Hello World!');

      const result = await appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});
