import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, Response } from '@nestjs/common';
import { PathInfoDTO } from '../../../contracts/common';
import { AppService } from './app.service';
import { RuleService } from '../../../core/resolver/rule-service';


@Controller()
export class AppController {
	constructor(
		private readonly ruleService: RuleService,
		private readonly appService: AppService
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Post('api/v1/resolve')
	@HttpCode(HttpStatus.OK)
	resolve(@Body() data: PathInfoDTO): Promise<any> {
		return this.ruleService.resolve(data);
	}
}
