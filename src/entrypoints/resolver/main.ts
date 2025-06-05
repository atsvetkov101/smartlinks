import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import httpContext from 'express-http-context';

import { LoggerService } from '../../logger/logger.service';

import { AppModule } from './app/app.module';
import { getHttpContextConfig } from '../../configs/http-context.config';
import * as express from 'express';
import { ExceptionsFilter } from '../../filters/exceptions.filter';

const PORT = 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const logger = await app.resolve(LoggerService);

	app.use(httpContext.middleware);
	
	app.use(getHttpContextConfig());
  app.useGlobalFilters(new ExceptionsFilter());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: false,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);
	const port = process.env.PORT || PORT;
	await app.listen(port);

	logger.log(`Resolver listening on http://localhost:${port}`);
}
bootstrap();
