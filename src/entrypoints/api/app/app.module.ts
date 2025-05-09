import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerModule } from '../../../logger/logger.module';
import { LoggerService } from '../../../logger/logger.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationMiddleware } from '../auth/auth.middleware';
import { AppUsecases } from './app.usecases';
import { AuthService } from '../auth/auth.service';
const EXCLUDED_ROUTES = [
	'/api/v1/login', '/'
];
const JWT_SECRET = process.env.JWT_SECRET || 'default;.super!@321SECRET$$';

@Module({
	imports: [LoggerModule,
		JwtModule.register({
			global: true,
			secret: JWT_SECRET,
		}),
	],
	controllers: [AppController],
	providers: [AppService, LoggerService, AppUsecases, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
			.apply(AuthenticationMiddleware)
			.exclude(...EXCLUDED_ROUTES)
			.forRoutes('*');
  }
}
