import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import httpContext from 'express-http-context';
import { CustomHttpException } from '../../../core/exceptions/custom-http-exception';

const USER_HTTP_CONTEXT = 'user';
const AVAILABLE_GAME = 'game';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
	constructor(private readonly jwtService: JwtService) {}

	async use(req: Request, _: Response, next: NextFunction) {
		const token = req.headers.authorization;
		if (!token?.split(' ')[1]) {
			throw new CustomHttpException(
				{
					errorCode: 'InvalidToken',
					error: 'Invalid Token',
				},
				{ statusCode: HttpStatus.UNAUTHORIZED },
			);
		}
		let decodedToken;
		try {
			decodedToken = await this.jwtService.verifyAsync(token.split(' ')[1]);
		} catch (err: any) {
			throw new CustomHttpException(
				{
					errorCode: 'InvalidToken',
					error: 'Invalid Token',
				},
				{ statusCode: HttpStatus.UNAUTHORIZED },
			);
		}
		httpContext.set(USER_HTTP_CONTEXT, decodedToken.id);
    console.log(`Setting httpContext ${USER_HTTP_CONTEXT} ${decodedToken.id}`);
    if(decodedToken.gameId){
      httpContext.set(AVAILABLE_GAME, decodedToken.gameId);
      console.log(`Setting httpContext ${AVAILABLE_GAME} ${decodedToken.gameId}`);
    }
		next();
	}
}
