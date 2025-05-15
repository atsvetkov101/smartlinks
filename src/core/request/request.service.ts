import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";
import { Request, Response } from 'express';
import httpContext from 'express-http-context';
import { RequestPreparer } from "./request-preparer";

@Injectable()
export class RequestService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly requestPreparer: RequestPreparer
  ) {}

  async process(req: Request, res: Response): Promise<void> {
   this.loggerService.log(`Start processing path: ${req.url}`);

   await this.requestPreparer.process(req, res);
    // TODO: implementation
    // ...
    // httpContext.set('smartlink-context', decodedToken.id);

    return Promise.resolve();
  }
}
