import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { LoggerModule } from '../../../logger/logger.module';
import { LoggerService } from '../../../logger/logger.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationMiddleware } from '../auth/auth.middleware';
import { AppUsecases } from './app.usecases';
import { AuthService } from '../auth/auth.service';
import { CommandFactory } from '../../../core/command-factory';
import { Chain } from '../../../core/chain/chain';
import { ConditionExecutionHandler } from '../../../core/chain/condition-execution-handler';

const JWT_SECRET = process.env.JWT_SECRET || 'default;.super!@321SECRET$$';

@Module({
	imports: [LoggerModule,
		JwtModule.register({
			global: true,
			secret: JWT_SECRET,
		}),
	],
	controllers: [AppController],
	providers: [AppService
		, LoggerService
		, AppUsecases
		, AuthService
		, CommandFactory
	  , Chain
	, ConditionExecutionHandler],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
			.apply(AuthenticationMiddleware)
			.exclude({ path: '/', method: RequestMethod.GET }, 
				{ path: '/api/v1/login', method: RequestMethod.POST }, 
				{ path: '/favicon.ico', method: RequestMethod.GET },
			)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
