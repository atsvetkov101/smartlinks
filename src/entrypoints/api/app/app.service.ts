import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../../logger/logger.service';

@Injectable()
export class AppService {
	constructor(private readonly loggerService: LoggerService) {}

	getHello(): string {
		this.loggerService.log('invoked method getHello()');
		return 'Hello World!';
	}

	testRequest(): Promise<any>{
		return Promise.resolve({ result: 'test' });
	}
}
