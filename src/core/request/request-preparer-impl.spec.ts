import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { RequestPreparerImpl } from './request-preparer-impl';
import { LoggerService } from '../../logger/logger.service';
import { ResolverClient } from '../resolver-client/client';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { ProcessStrategyA } from './process-strategy-a';
import { SmartLinkRequestBuilder } from '../common/smart-link-request-builder';

describe('RequestPreparerImpl', () => {
    let requestPreparer: RequestPreparerImpl;

    const mockRequest: Partial<Request> = {
        path: '/some/path/',
        ip: '127.0.0.1',
        httpVersion: '1.1',
        method: 'GET',
        hostname: 'localhost',
        url: 'http://localhost/some/path/',
        headers: { 'x-test': 'test' },
        query: { key: 'value' },
    };

    const mockResponse: Partial<Response> = {
        redirect: jest.fn(),
    };

    const mockLoggerService = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn(),
        info: jest.fn(),
    };

    const mockResolverClient = {
        resolve: jest.fn(),
    };

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [RequestPreparerImpl,
              LoggerService,
              ResolverClient,
            ],  
        }).overrideProvider(LoggerService).useValue(mockLoggerService)
          .overrideProvider(ResolverClient).useValue(mockResolverClient)
          .compile();

        requestPreparer = module.get<RequestPreparerImpl>(RequestPreparerImpl);

        // Replace the processStrategy with a mock to avoid deep constructor issues
        (requestPreparer as any).processStrategy = {
            process: jest.fn((req, res) => requestPreparer.process(req, res))
        };
    });

    describe('collectParams', () => {
        it('should collect parameters from the request and return a SmartLinkRequest', () => {
            const smartLinkRequest = requestPreparer.collectParams(mockRequest as Request);
            expect(smartLinkRequest).toBeDefined();
            expect(smartLinkRequest.get('path')).toBe('some/path');
            expect(smartLinkRequest.get('ip')).toBe(mockRequest.ip);
            expect(smartLinkRequest.get('httpVersion')).toBe(mockRequest.httpVersion);
            expect(smartLinkRequest.get('method')).toBe(mockRequest.method);
            expect(smartLinkRequest.get('hostname')).toBe(mockRequest.hostname);
            expect(smartLinkRequest.get('url')).toBe(mockRequest.url);
            expect(smartLinkRequest.get('x-test')).toBe(mockRequest.headers['x-test']);
            expect(smartLinkRequest.get('query')).toBe(mockRequest.query);
        });
    });

    describe('resolveSmartLink', () => {
        it('should resolve a SmartLink using the ResolverClient', async () => {
            const mockSmartLinkRequest = new SmartLinkRequest();
            mockSmartLinkRequest.set('path', 'test');
            mockSmartLinkRequest.set('ip', '127.0.0.1');
            mockSmartLinkRequest.set('method', 'GET');


            const mockSmartLinkResponse = new SmartLinkResponse();
            mockSmartLinkResponse.set('url', 'http://example.com');
            mockSmartLinkResponse.set('status', '301');

            (mockResolverClient.resolve as jest.Mock).mockResolvedValue(mockSmartLinkResponse);

            const resolved = await requestPreparer.resolveSmartLink(mockSmartLinkRequest);
            expect(resolved).toEqual(mockSmartLinkResponse);
            expect(mockResolverClient.resolve).toHaveBeenCalledWith(mockSmartLinkRequest);
        });
    });

    describe('prepareResponse', () => {
        it('should redirect with the resolved response and log the action', () => {
            const mockSmartLinkResponse = new SmartLinkResponse();
            mockSmartLinkResponse.set('url', 'http://example.com');
            mockSmartLinkResponse.set('status', '302');

            requestPreparer.prepareResponse(mockSmartLinkResponse, mockResponse as Response);
            expect(mockLoggerService.log).toHaveBeenCalledWith(
                `prepareResponse: Redirecting to ${mockSmartLinkResponse.url} with status ${mockSmartLinkResponse.status}`
            );                
            expect(mockResponse.redirect).toHaveBeenCalledWith(Number(mockSmartLinkResponse.status), mockSmartLinkResponse.url);
        });
    });

    describe('process', () => {
        it('should process the request and return the response as defined by the strategy', async () => {
            const mockStrategyProcess = jest.fn();
            (requestPreparer as any).processStrategy = {
                process: mockStrategyProcess,
            } as any;

            await requestPreparer.process(mockRequest as Request, mockResponse as Response);
            expect(mockStrategyProcess).toHaveBeenCalledWith(mockRequest, mockResponse);
        });
    });
});
