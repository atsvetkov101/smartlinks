import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../../src/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from '../../src/entrypoints/api/app/app.controller';
import { AppService } from '../../src/entrypoints/api/app/app.service';
import { AuthService } from '../../src/entrypoints/api/auth/auth.service';
import { AppUsecases } from '../../src/entrypoints/api/app/app.usecases';
import { LoggerService } from '../../src/logger/logger.service';

import { Chain } from '../../src/core/chain/chain';
import { ConditionExecutionHandler } from '../../src/core/chain/condition-execution-handler';
import { BaseConditionExecutionHandler } from '../../src/core/chain/base-condition-execution-handler';
import { createTestingModule } from './test-helper';

const JWT_SECRET = 'JWT_SECRET';

/**
* Тестирует функциональность аутентификации API (метод login).
* Проверяет успешный и неуспешный сценарии логина с использованием JWT-токенов.
*
* Тест suite:
* 1. Успешная аутентификация: проверка получения JWT-токена при корректных логине и пароле.
* 2. Неуспешная аутентификация: проверка поведения при передаче ошибочного пароля.
*/
describe('ApiLogin', () => {
  let app: TestingModule;
  beforeAll(async () => {
    app = await createTestingModule();
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
