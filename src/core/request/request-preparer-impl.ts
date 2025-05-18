import { Request, Response } from "express";
import { SmartLinkRequest } from "../common/smart-link-request";
import { SmartLinkResponse } from "../common/smart-link-response";
import { RequestPreparer } from "./request-preparer";
import { IProcessStrategy } from "./iprocess-strategy";
import { Injectable } from "@nestjs/common";
import { ProcessStrategy } from "./process-strategy";
import { LoggerService } from "../../logger/logger.service";
import { ProcessStrategyB } from "./process-strategy-b";
import { ProcessStrategyA } from "./process-strategy-a";
import { ResolverClient } from "../resolver-client/client";

@Injectable()
export class RequestPreparerImpl extends RequestPreparer {
    private readonly processStrategy:ProcessStrategy;
    constructor(
        private readonly loggerService: LoggerService,
        private readonly resolverClient: ResolverClient
    ){
        super();
        this.processStrategy = new ProcessStrategyA(
            this
            , this.loggerService
        );
    }
    async process(req: Request, res: Response): Promise<void> {
        return this.processStrategy.process(req, res);
        /*
        const smartLinkRequest = this.collectParams(req);
        // Обращение к микросервису resolver
        const smartLinkResponse = await this.resolveSmartLink(smartLinkRequest);
        this.prepareResponse(smartLinkResponse, res);
        return Promise.resolve();
        */
    }
    collectParams(req: Request): SmartLinkRequest {
        const res = new SmartLinkRequest();
        res.set('path', req.path);
        res.set('ip', req.ip);
        res.set('httpVersion', req.httpVersion);
        res.set('method', req.method);
        res.set('hostname', req.hostname);
        res.set('url', req.url);
        res.set('headers', req.headers);
        res.set('query', req.query);
        res.set('requestTimestamp', (new Date()).toISOString());
        return res;
    }
    resolveSmartLink(smartLinkRequest: SmartLinkRequest): Promise<SmartLinkResponse> {
        return this.resolverClient.resolve(smartLinkRequest);
    }
    prepareResponse(smartLinkResponse: SmartLinkResponse, res: Response): void {
        res.redirect(301, smartLinkResponse.get('url'));   
    }
}
