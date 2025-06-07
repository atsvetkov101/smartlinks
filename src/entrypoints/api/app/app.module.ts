import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { LoggerModule } from '../../../logger/logger.module';
import { LoggerService } from '../../../logger/logger.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AppUsecases } from './app.usecases';
import { AuthService } from '../auth/auth.service';
import { Chain } from '../../../core/chain/chain';
import { ConditionExecutionHandler } from '../../../core/chain/condition-execution-handler';
import { RequestProcessingMiddleware } from '../request/request-processing-middleware';
import { RequestService } from '../../../core/request/request.service';
import { RequestPreparer } from '../../../core/request/request-preparer';
import { RequestPreparerImpl } from '../../../core/request/request-preparer-impl';
import { ProcessStrategyA } from '../../../core/request/process-strategy-a';
import { IProcessStrategy } from '../../../core/request/iprocess-strategy';
import { ProcessStrategy } from '../../../core/request/process-strategy';
import { ExceptionHandler } from '../../../core/error/exception-handler';
import { ExceptionHandlerConfig } from '../../../core/error/exception-handler-config';
import { ResolverClient } from '../../../core/resolver-client/client';
// import { HttpService } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';

const JWT_SECRET = process.env.JWT_SECRET || 'default;.super!@321SECRET$$';

@Module({
	imports: [LoggerModule,
		JwtModule.register({
			global: true,
			secret: JWT_SECRET,
		}),
		HttpModule
	],
	controllers: [AppController],
	providers: [AppService
		, LoggerService
		, AppUsecases
		, AuthService
	  , Chain
		, ConditionExecutionHandler
		, RequestService
		, {
		  provide: RequestPreparer,
		  useClass: RequestPreparerImpl,
		},
		{
			provide: ProcessStrategy,
			useClass: ProcessStrategyA,
		}
		, ExceptionHandler
		, ExceptionHandlerConfig
		, RequestPreparerImpl
		, ResolverClient
		],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
			.apply(RequestProcessingMiddleware)
			.exclude({ path: '/', method: RequestMethod.GET }, 
				{ path: '/api/v1/login', method: RequestMethod.POST }, 
				{ path: '/favicon.ico', method: RequestMethod.GET },
			)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
