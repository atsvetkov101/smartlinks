import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";
import { Request, Response } from 'express';
import httpContext from 'express-http-context';
import { RequestPreparer } from "./request-preparer";
import { ExceptionHandler } from "../error/exception-handler";

@Injectable()
export class RequestService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly requestPreparer: RequestPreparer,
    private readonly exceptionHandler: ExceptionHandler
  ) {}

  async process(req: Request, res: Response): Promise<void> {
    this.loggerService.log(`Start processing path: ${req.url}`);
    await this.requestPreparer.process(req, res);
    return Promise.resolve();
  }
}
