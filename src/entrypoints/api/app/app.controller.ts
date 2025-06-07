import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Response } from '@nestjs/common';

import { AppService } from './app.service';
import { Authentication } from '../../../contracts/authentication';
import { AppUsecases } from './app.usecases';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly appUsecases: AppUsecases,
	) {}

	@Get()
	getHello(): string {
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
