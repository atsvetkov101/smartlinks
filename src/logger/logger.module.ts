import { DynamicModule, Global, Module } from '@nestjs/common';

import { LoggerService } from './logger.service';

@Global()
@Module({
	providers: [LoggerService],
	exports: [LoggerService],
})
export class LoggerModule {
	static forRootAsync(): DynamicModule {
		return {
			module: LoggerModule,
			providers: [LoggerService],
			exports: [LoggerService],
		};
	}
}

