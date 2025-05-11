import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Response } from '@nestjs/common';

import { AppService } from './app.service';
import { Authentication } from '../../../contracts/authentication';
import { AppUsecases } from './app.usecases';
import { CommandFactory } from '../../../core/command-factory';
import { ICommand } from '../../../core/interfaces/icommand';
import { Chain } from '../../../core/chain/chain';
@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly appUsecases: AppUsecases,
		private readonly commandFactory: CommandFactory,
		private readonly chain: Chain,
	) {}

	@Get()
	getHello(): string {
		// const RuleCommand: ICommand = this.commandFactory.createRuleCommand({test1: 'test1', test2: 'test2'});
		// this.chain
		
		

		return this.appService.getHello();
	}

	@Post('api/v1/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: Authentication.LoginRequest): Promise<Authentication.LoginResponse> {
    return this.appUsecases.login(dto);
  }

	@Get('7asdpuh4o87gf')
	testRequest(): Promise<any> {
		return this.appService.testRequest();
	}

}
