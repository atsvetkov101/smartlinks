import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../../src/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from '../../src/entrypoints/api/app/app.controller';
import { AppService } from '../../src/entrypoints/api/app/app.service';
import { AuthService } from '../../src/entrypoints/api/auth/auth.service';
import { AppUsecases } from '../../src/entrypoints/api/app/app.usecases';
import { LoggerService } from '../../src/logger/logger.service';
import { BaseConditionExecutionHandler } from '../../src/core/chain/base-condition-execution-handler';
import { ConditionExecutionHandler } from '../../src/core/chain/condition-execution-handler';
import { Chain } from '../../src/core/chain/chain';

const JWT_SECRET = 'JWT_SECRET';

export const createTestingModule = async (): Promise<TestingModule> => {
  return await Test.createTestingModule({
        imports: [LoggerModule,
          JwtModule.register({
            global: true,
            secret: JWT_SECRET,
          }),
        ],
        controllers: [AppController],
        providers: [AppService, LoggerService, AppUsecases, AuthService, Chain
          ,{
            provide: BaseConditionExecutionHandler,
            useClass: ConditionExecutionHandler,
          } 
          ],
      }).compile();
}