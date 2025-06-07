import { Request, Response } from 'express';
import { ProcessStrategyB } from './process-strategy-b';
import { RequestPreparer } from "./request-preparer";
import { LoggerService } from "../../logger/logger.service";
import { ProcessStrategyA } from './process-strategy-a';
import { ApplicationError } from '../error/application-error';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { before } from 'node:test';

describe('ProcessStrategyB', () => {
  let processStrategyB: ProcessStrategyB;

  let loggerService: LoggerService;
  let processStrategyA: ProcessStrategyA;
  const mockSmartLinkRequest = new SmartLinkRequest();
  const mockSmartLinkResponse = new SmartLinkResponse();
  let mockRequestPreparer: any;

  beforeEach(() => {
    mockRequestPreparer = {
      collectParams: jest.fn().mockReturnValue(mockSmartLinkRequest),
      resolveSmartLink: jest.fn().mockReturnValue(mockSmartLinkResponse),
      prepareResponse: jest.fn().mockReturnValue(undefined),
    };
    loggerService = new LoggerService();
    processStrategyA = new ProcessStrategyA(mockRequestPreparer, loggerService);
    processStrategyB = new ProcessStrategyB(mockRequestPreparer, loggerService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('checkMethod', () => {
    it('should return true for "GET" method', () => {
      const mockRequest: Partial<Request> = { method: 'GET' };
      const result = processStrategyB.checkMethod(mockRequest as Request);
      expect(result).toBe(true);
    });

    it('should return true for "HEAD" method', () => {
      const mockRequest: Partial<Request> = { method: 'HEAD' };
      const result = processStrategyB.checkMethod(mockRequest as Request);
      expect(result).toBe(true);
    });

    it('should return false for any other method', () => {
      const otherMethods = ['POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
      otherMethods.forEach((method) => {
        const mockRequest: Partial<Request> = { method };
        const result = processStrategyB.checkMethod(mockRequest as Request);
        expect(result).toBe(false);
      });
    });
  });

  describe('process 1', () => {
    it('should throw ApplicationError when HTTP method is not allowed', async () => {
      const mockRequest: Partial<Request> = { method: 'POST' };
      const mockResponse: Partial<Response> = {};

      await expect(processStrategyB.process(mockRequest as Request, mockResponse as Response)).rejects.toThrow(
        ApplicationError
      );

      await expect(processStrategyB.process(mockRequest as Request, mockResponse as Response)).rejects     
      .toHaveProperty(
        'ErrorNumber',
        5001
      );
      
      await expect(processStrategyB.process(mockRequest as Request, mockResponse as Response)).rejects.toHaveProperty(
        'message',
        'HTTP метод не поддерживается'
      );
    });
  });
  describe('process 2', () => {
    /*
    let strategyAProcessSpy;
    beforeEach(() => {
      strategyAProcessSpy = jest.spyOn(processStrategyA, 'process').mockImplementation(async () => Promise.resolve());
    });
    afterEach(() => {
      strategyAProcessSpy.mockRestore();
    });
    */
    let strategyAProcessSpy;
    afterEach(() => {
      strategyAProcessSpy.mockRestore();
    });
    it('should call process on processStrategyA when the method is allowed', async () => {
      const mockRequest: Partial<Request> = { method: 'GET' };
      const mockResponse: Partial<Response> = {};
      const originalProcess = processStrategyA.process;

      // strategyAProcessSpy = jest.spyOn(processStrategyA, 'process').mockImplementation(async () => Promise.resolve());
      strategyAProcessSpy = jest.spyOn(Object.getPrototypeOf(processStrategyA), 'process');


      await processStrategyB.process(mockRequest as Request, mockResponse as Response);

      expect(strategyAProcessSpy).toHaveBeenCalledTimes(1);
      expect(strategyAProcessSpy).toHaveBeenCalledWith(mockRequest as Request, mockResponse as Response);

      
    });
  });
});
