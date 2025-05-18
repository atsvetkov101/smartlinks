import { Request, Response } from 'express';
import { Injectable } from "@nestjs/common";
import { IProcessStrategy } from "./iprocess-strategy";
import { LoggerService } from "../../logger/logger.service";
import { RequestPreparer } from "./request-preparer";
import { ProcessStrategy } from './process-strategy';
import { ProcessStrategyA } from './process-strategy-a';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { ApplicationError } from '../error/application-error';

/*
Еще проверяем метод входного запроса. Пропускаем только 'GET' и 'HEAD'
*/
export class ProcessStrategyB extends ProcessStrategy implements IProcessStrategy {
  // в стратегии ProcessStrategyB используется логика из стратегии ProcessStrategyA
  // по-этому в стратегии эксемпляре ProcessStrategyB создаем экземпляр ProcessStrategyA
  private readonly processStrategyA: ProcessStrategyA;
  constructor(
    private readonly requestPreparer: RequestPreparer,
    private readonly loggerService: LoggerService
    ){
    super();
    this.processStrategyA = new ProcessStrategyA(requestPreparer, loggerService);
  }
  
  async process(req: Request, res: Response): Promise<void>{
    if(!this.checkMethod(req)){
      throw new ApplicationError(5001, 'HTTP метод не поддерживается');
    }
    return this.processStrategyA.process(req, res);
  }

  checkMethod(req: Request): boolean {
      return req.method === 'GET' || req.method === 'HEAD'
  }
}
