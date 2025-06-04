import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

interface IErrorResponse {
	error: string;
	errorCode: string;
	message?: string | string[];
	validationErrors?: Record<string, string>;
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		let status = 500;
		if(exception.hasOwnProperty('getStatus')){
			 status = exception.getStatus();
		} 
		
		const	exceptionResponse = {
			error: 'Внутренняя ошибка сервера',
		  errorCode: 'INTERNAL_SERVER_ERROR',
		};
		

		const errorResponse = {
			data: null,
			success: false,
			...exceptionResponse,
		};

		response.status(status).json(errorResponse);
	}
}
