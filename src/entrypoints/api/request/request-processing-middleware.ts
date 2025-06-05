import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestService } from '../../../core/request/request.service';
import { CustomHttpException } from '../../../core/exceptions/custom-http-exception';
import { LoggerService } from '../../../logger/logger.service';

@Injectable()
export class RequestProcessingMiddleware implements NestMiddleware {
  constructor(private readonly requestService: RequestService,
    private readonly loggerService: LoggerService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    let decodedToken;
    try {
      this.loggerService.log(`Processing path: ${req.url}`);
      await this.requestService.process(req, res);
    } catch (err: any) {
      this.loggerService.error(`RequestProcessingMiddleware: ${err.message} ${JSON.stringify(err)}`);
     
      throw new CustomHttpException(
        {
          errorCode: 'Неизвестная ошибка',
          error: 'Неизвестная ошибка',
        },
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      );
     
    }
    // next(); 
  }
}
