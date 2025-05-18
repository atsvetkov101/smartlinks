import { Request, Response } from 'express';
import { Injectable } from "@nestjs/common";
import { IProcessStrategy } from "./iprocess-strategy";
import { LoggerService } from "../../logger/logger.service";
import { RequestPreparer } from "./request-preparer";
import { ProcessStrategy } from './process-strategy';

export class ProcessStrategyA extends ProcessStrategy implements IProcessStrategy {
  constructor(
    private readonly requestPreparer: RequestPreparer,
    private readonly loggerService: LoggerService){
    super();
  }
  
  async process(req: Request, res: Response): Promise<void>{
  
    const smartLinkRequest = this.requestPreparer.collectParams(req);
    // Обращение к микросервису resolver
    const smartLinkResponse = await this.requestPreparer.resolveSmartLink(smartLinkRequest);

    this.requestPreparer.prepareResponse(smartLinkResponse, res);
    return Promise.resolve();
  }
}
