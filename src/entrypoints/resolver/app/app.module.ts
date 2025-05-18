import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { LoggerModule } from '../../../logger/logger.module';
import { LoggerService } from '../../../logger/logger.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppUsecases } from './app.usecases';

import { CommandFactory } from '../../../core/command-factory';
import { Chain } from '../../../core/chain/chain';
import { ConditionExecutionHandler } from '../../../core/chain/condition-execution-handler';
import { RequestService } from '../../../core/request/request.service';
import { RequestPreparer } from '../../../core/request/request-preparer';
import { RequestPreparerImpl } from '../../../core/request/request-preparer-impl';
import { ProcessStrategyA } from '../../../core/request/process-strategy-a';
import { IProcessStrategy } from '../../../core/request/iprocess-strategy';
import { ProcessStrategy } from '../../../core/request/process-strategy';
import { ExceptionHandler } from '../../../core/error/exception-handler';
import { ExceptionHandlerConfig } from '../../../core/error/exception-handler-config';
import { RuleService } from '../../../core/resolver/rule-service';
import { PathRulesRepository } from '../../../database/path-rules/path-rules.repositry';
import { PathRulesMapper } from '../../../database/path-rules/path-rules.mapper';
import { SequelizeModule } from '@nestjs/sequelize';
import { PathRulesModel } from '../../../database/path-rules/path-rules.model';
import { getPostgresConfig } from '../../../configs/postgres.config';

@Module({
	imports: [
		LoggerModule,
		SequelizeModule.forRootAsync(getPostgresConfig()),
		SequelizeModule.forFeature([PathRulesModel]),
	],
	controllers: [AppController],
	providers: [AppService
		, LoggerService
		, AppUsecases
		, CommandFactory
	    , Chain
		, ConditionExecutionHandler
		, RuleService
		, PathRulesRepository
		, PathRulesMapper
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
		],
})
export class AppModule {}


