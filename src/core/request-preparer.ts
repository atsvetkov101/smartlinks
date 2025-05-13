import { Request, Response } from 'express';
import { SmartLinkRequest } from './resolver/smart-link-request';
import { SmartLinkResponse } from './resolver/smart-link-response';

// шаблон template method
abstract class RequestPreparer {
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