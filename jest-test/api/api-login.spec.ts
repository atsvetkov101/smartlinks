import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../../src/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from '../../src/entrypoints/api/app/app.controller';
import { AppService } from '../../src/entrypoints/api/app/app.service';
import { AuthService } from '../../src/entrypoints/api/auth/auth.service';
import { AppUsecases } from '../../src/entrypoints/api/app/app.usecases';
import { LoggerService } from '../../src/logger/logger.service';
import { CommandFactory } from '../../src/core/command-factory';
import { Chain } from '../../src/core/chain/chain';
import { ConditionExecutionHandler } from '../../src/core/chain/condition-execution-handler';

const JWT_SECRET = 'JWT_SECRET';

describe('ApiLogin', () => {
  let app: TestingModule;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [LoggerModule,
        JwtModule.register({
          global: true,
          secret: JWT_SECRET,
        }),
      ],
      controllers: [AppController],
      providers: [AppService, LoggerService, AppUsecases, AuthService, Chain, CommandFactory, ConditionExecutionHandler],
    }).compile();
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  describe('Набор тестов для метода login', function() {
    it('Реализована аутентификация с помощью jwt. успешный login. получение jwt-токена', async function() {
      const appController = app.get(AppController);
      const result = await appController.login({"login": "Alex","password": "alex$secret_password"});
      expect(result).toBeDefined();
      expect(result.success).toEqual(true);
      expect(result.token).toBeDefined();
    });
    it('Реализована аутентификация с помощью jwt. неуспешный login при передаче ошибочного пароля', async function() {
      const appController = app.get(AppController);
      const result = await appController.login({"login": "Alex","password": "wrong_password"});
      expect(result).toBeDefined();
      expect(result.success).toEqual(false);
    });
  });
});
