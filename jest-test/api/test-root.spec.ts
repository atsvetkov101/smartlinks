import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../../src/logger/logger.module';
import { LoggerService } from '../../src/logger/logger.service';
import { AppController } from '../../src/entrypoints/api/app/app.controller';
import { AppService } from '../../src/entrypoints/api/app/app.service';
import { AppUsecases } from '../../src/entrypoints/api/app/app.usecases';
import { AuthService } from '../../src/entrypoints/api/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CommandFactory } from '../../src/core/command-factory';
import { Chain } from '../../src/core/chain/chain';
import { ConditionExecutionHandler } from '../../src/core/chain/condition-execution-handler';
import { createTestingModule } from './test-helper';

const JWT_SECRET = 'JWT_SECRET';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule();
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
