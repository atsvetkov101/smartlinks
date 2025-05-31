import { Request, Response } from 'express';
import { Injectable } from "@nestjs/common";
import { IProcessStrategy } from "./iprocess-strategy";
import { LoggerService } from "../../logger/logger.service";
import { RequestPreparer } from "./request-preparer";
import { ProcessStrategy } from './process-strategy';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';

export class ProcessStrategyA extends ProcessStrategy implements IProcessStrategy {
  private req: Request;
  private res: Response;
  constructor(
    private readonly requestPreparer: RequestPreparer,
    private readonly loggerService: LoggerService){
    super();
  }
  
  async process(req: Request, res: Response): Promise<void>{
    this.req = req;
    this.res = res;
    const smartLinkRequest = this.requestPreparer.collectParams(req);
    // Обращение к микросервису resolver
    const smartLinkResponse = await this.requestPreparer.resolveSmartLink(smartLinkRequest);

    this.requestPreparer.prepareResponse(smartLinkResponse, res);
    return Promise.resolve();
  }

  collectParams(req: Request): SmartLinkRequest{
    this.preCollectParams();
    const result = this.requestPreparer.collectParams(req);
    this.postCollectParams();
    return result;
  }

  async resolveSmartLink(smartLinkRequest: SmartLinkRequest): Promise<SmartLinkResponse>{
    this.preResolveSmartLink();
    const result = await this.requestPreparer.resolveSmartLink(smartLinkRequest);
    this.postResolveSmartLink(); 
    return Promise.resolve(result);
  }

  prepareResponse(smartLinkResponse: SmartLinkResponse, res: Response): void{
    this.prePrepareResponse();
    const result = this.requestPreparer.prepareResponse(smartLinkResponse, res);
    this.postPrepareResponse();
    return result;
  }

  preCollectParams(): void{
    // ничего не делаем
  }
  postCollectParams(): void{
    // ничего не делаем
  }
  preResolveSmartLink(): void{
    // ничего не делаем
  }
  postResolveSmartLink(): void{
    // ничего не делаем
  }
  prePrepareResponse(): void{
    // ничего не делаем
  }
  postPrepareResponse(): void{
    // ничего не делаем
  }

}
