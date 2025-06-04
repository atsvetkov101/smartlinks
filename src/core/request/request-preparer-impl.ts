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
import { SmartLinkRequestBuilder } from "../common/smart-link-request-builder";

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
    }
    collectParams(req: Request): SmartLinkRequest {
        const builder = new SmartLinkRequestBuilder();

        const path = req.path.replace(/^\/+|\/+$/g, ""); // Удаляем все слеши в начале и в конце строки
        const res = builder
        .append('path', path)
        .append('ip', req.ip)
        .append('httpVersion', req.httpVersion)
        .append('method', req.method)
        .append('hostname', req.hostname)
        .append('url', req.url)
        .appendHeaders(req.headers)
        .append('query', req.query)
        .appendDateIfNeeded()
        .build();

        return res;
    }
    resolveSmartLink(smartLinkRequest: SmartLinkRequest): Promise<SmartLinkResponse> {
        return this.resolverClient.resolve(smartLinkRequest);
    }
    prepareResponse(smartLinkResponse: SmartLinkResponse, res: Response): void {
        this.loggerService.log(`prepareResponse: Redirecting to ${smartLinkResponse.url} with status ${smartLinkResponse.status}`);
        res.redirect(Number(smartLinkResponse.status), smartLinkResponse.url);
    }
}
