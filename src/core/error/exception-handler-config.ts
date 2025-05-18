
import { Injectable } from '@nestjs/common';
import { ExceptionHandlerFunction } from './exception-handler-function';
import { ExceptionHandlers } from './exception-handlers-type';
import { LoggerService } from '../../logger/logger.service';
import { ApplicationError } from './application-error';

@Injectable()
export class ExceptionHandlerConfig {
  constructor(
    private readonly loggerService: LoggerService
  ){
  }

  public getHandlers() {
    const handlers: ExceptionHandlers = new Map<number, ExceptionHandlerFunction>();
       
    handlers.set(0, (e: ApplicationError): void => {
        this.loggerService.error(`Неизвестная ошибка: ${e.message} ${e?.stack}`);
      }
    );

    handlers.set(5001, (e: ApplicationError): void => {
        this.loggerService.error(`Ошибка валидации запроса: ${e.message}`);
      }
    );

    return handlers;
  }
}