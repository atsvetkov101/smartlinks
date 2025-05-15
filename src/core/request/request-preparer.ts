import { Request, Response } from 'express';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { Injectable } from '@nestjs/common';

// шаблон template method
@Injectable()
export abstract class RequestPreparer {
  async process(req: Request, res: Response): Promise<void>{

    const smartLinkRequest = this.collectParams(req);
    // Обращение к микросервису resolver
    const smartLinkResponse = await this.resolveSmartLink(smartLinkRequest);

    this.prepareResponse(smartLinkResponse, res);
    return Promise.resolve();
  }

  abstract collectParams(req: Request): SmartLinkRequest;

  abstract resolveSmartLink(smartLinkRequest: SmartLinkRequest): Promise<SmartLinkResponse>;

  abstract prepareResponse(smartLinkResponse: SmartLinkResponse, res: Response): void;

}