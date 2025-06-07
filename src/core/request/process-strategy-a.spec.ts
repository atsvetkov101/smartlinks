import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { ProcessStrategyA } from './process-strategy-a';
import { RequestPreparer } from './request-preparer';
import { LoggerService } from '../../logger/logger.service';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';

describe('ProcessStrategyA', () => {
  let strategy: ProcessStrategyA;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockRequestPreparer: any;
  let mockLoggerService: any;

  const mockSmartLinkRequest = new SmartLinkRequest();
  const mockSmartLinkResponse = new SmartLinkResponse();

  beforeEach(async () => {
    mockRequestPreparer = {
      collectParams: jest.fn().mockReturnValue(mockSmartLinkRequest),
      resolveSmartLink: jest.fn().mockReturnValue(mockSmartLinkResponse),
      prepareResponse: jest.fn().mockReturnValue(undefined),
    };

    mockLoggerService = {
      debug: jest.fn(),
      error: jest.fn(),
    };

    mockRequest = {
      query: {},
      params: {},
    } as unknown as Request;
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    strategy = new ProcessStrategyA(mockRequestPreparer, mockLoggerService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('process()', () => {
    it('should collect params, resolve the smart link, and prepare the response', async () => {
      await strategy.process(mockRequest, mockResponse);

      expect(mockRequestPreparer.collectParams).toHaveBeenCalledWith(mockRequest);
      expect(mockRequestPreparer.resolveSmartLink).toHaveBeenCalledWith(mockSmartLinkRequest);
      expect(mockRequestPreparer.prepareResponse).toHaveBeenCalledWith(mockSmartLinkResponse, mockResponse);
    });

    it('should assign req and res to instance properties before processing', async () => {
      await strategy.process(mockRequest, mockResponse);

      expect(strategy['req']).toBe(mockRequest);
      expect(strategy['res']).toBe(mockResponse);
    });

    it('should return a void Promise', async () => {
      const result = await strategy.process(mockRequest, mockResponse);
      expect(result).toBeUndefined();
    });
  });
  describe('collectParams', () => {
    it('should call preCollectParams, requestPreparer.collectParams, and postCollectParams, returning the result from requestPreparer.collectParams', () => {
     const mockSmartLinkRequest: SmartLinkRequest = new SmartLinkRequest();
      mockSmartLinkRequest.set('id', '123');
      mockSmartLinkRequest.set('name', 'TestLink');
      
      mockRequestPreparer.collectParams = jest.fn();
      mockRequestPreparer.collectParams.mockReturnValue(mockSmartLinkRequest);
      
      const result = strategy.collectParams(mockRequest);
      
      expect(mockRequestPreparer.collectParams).toHaveBeenCalledWith(mockRequest);
      expect(result).toBe(mockSmartLinkRequest);
    });

    it('should call preCollectParams and postCollectParams before and after requestStep', () => {
      const mockSmartLinkRequest: SmartLinkRequest = new SmartLinkRequest();
      mockSmartLinkRequest.set('id', '123');
      mockSmartLinkRequest.set('name', 'TestLink');
      

      mockRequestPreparer.collectParams = jest.fn().mockReturnValue(mockSmartLinkRequest);
      
      const preSpy = jest.spyOn(strategy, 'preCollectParams');
      const postSpy = jest.spyOn(strategy, 'postCollectParams');
      
      strategy.collectParams(mockRequest);
      
      expect(preSpy).toHaveBeenCalled();
      expect(postSpy).toHaveBeenCalled();
    });
  });
  describe('resolveSmartLink', () => {
    it('should call preResolveSmartLink before calling requestPreparer.resolveSmartLink', async () => {
      const preResolveSmartLinkSpy = jest.spyOn(strategy as any, 'preResolveSmartLink');

      const request = new SmartLinkRequest();
      const response = await strategy.resolveSmartLink(request);

      expect(preResolveSmartLinkSpy).toHaveBeenCalled();
    });

    it('should call postResolveSmartLink after requestPreparer.resolveSmartLink', async () => {
      const postResolveSmartLinkSpy = jest.spyOn(strategy as any, 'postResolveSmartLink');

      const request = new SmartLinkRequest();
      const response = await strategy.resolveSmartLink(request);

      expect(postResolveSmartLinkSpy).toHaveBeenCalled();
    });

    it('should return result from requestPreparer.resolveSmartLink', async () => {
      const request = new SmartLinkRequest();
      const expectedResult = { resolvedUrl: 'https://resolved.com', status: 200 };
      mockRequestPreparer.resolveSmartLink = jest.fn();
      mockRequestPreparer.resolveSmartLink.mockReturnValue(expectedResult);

      const response = await strategy.resolveSmartLink(request);

      expect(response).toEqual(expectedResult);
    });
  });
  describe('resolveSmartLink', () => {
    it('should call prePrepareResponse before requestPreparer.prepareResponse', async () => {
      const preSpy = jest.spyOn(strategy, 'prePrepareResponse');
      const postSpy = jest.spyOn(strategy, 'postPrepareResponse');
      const prepareResponseSpy = jest.spyOn(mockRequestPreparer, 'prepareResponse');

      strategy.prepareResponse(mockSmartLinkResponse, mockResponse);
      expect(preSpy).toHaveBeenCalledTimes(1);
      expect(postSpy).toHaveBeenCalledTimes(1);
      expect(prepareResponseSpy).toHaveBeenCalledTimes(1);
    });
  });
});
