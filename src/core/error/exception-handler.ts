import { ApplicationError } from './application-error';
import { ExceptionHandlerConfig } from './exception-handler-config';
import { ExceptionHandlerFunction } from './exception-handler-function';
import { ExceptionHandlers } from './exception-handlers-type';
import { Injectable } from '@nestjs/common';

export const BASE_HANDLER = 0;

@Injectable()
export class ExceptionHandler {

  constructor( private readonly exceptionHandlerConfig: ExceptionHandlerConfig){}

  public handle(error: Error | unknown) {
    let handler;
    if (error instanceof ApplicationError){
      handler = this.exceptionHandlerConfig.getHandlers().get((error as ApplicationError).ErrorNumber);
    }
    if(handler){
      handler.call(this, (error as ApplicationError));
    } else {
      handler = this.exceptionHandlerConfig.getHandlers().get(BASE_HANDLER);
      handler.call(this, error as ApplicationError);
    }
  }
}

