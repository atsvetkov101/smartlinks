import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import httpContext from 'express-http-context';

import { LoggerService } from '../../logger/logger.service';

import { AppModule } from './app/app.module';
import { getHttpContextConfig } from '../../configs/http-context.config';

const PORT = 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const logger = await app.resolve(LoggerService);

	app.use(httpContext.middleware);
    
	app.use(getHttpContextConfig());

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);
	const port = process.env.PORT || PORT;
	await app.listen(port);

	logger.log(`Listening on http://localhost:${port}`);
}
bootstrap();
