import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { RequestPreparer } from './request-preparer';
import { ProcessStrategyA } from './process-strategy-a';

describe('RequestPreparer (abstract class)', () => {
  let sampleSmartLinkRequest;
  let sampleSmartLinkResponse;
  
  let mockLoggerService: any;
  let strategy: any
  let mockRequestPreparer: any;

  let collectParamsSpy;
  let resolveSmartLinkSpy;
  let prepareResponseSpy;

  beforeEach(() => {
    jest.clearAllMocks();

    mockLoggerService = {
      debug: jest.fn(),
      error: jest.fn(),
    };
    
    class MockRequestPreparer extends RequestPreparer {
      processStrategy: any;
      constructor(){
        super();
        this.processStrategy = new ProcessStrategyA(this, mockLoggerService);
      }

      process(req: Request, res: Response): Promise<void> {
        return this.processStrategy.process(req, res);
      }

      collectParams(req: Request): SmartLinkRequest {
        sampleSmartLinkRequest  = new SmartLinkRequest();
        sampleSmartLinkRequest.set('name', 'Sample SmartLinkRequest');
        return sampleSmartLinkRequest;
      }

      async resolveSmartLink(smartLinkRequest: SmartLinkRequest): Promise<SmartLinkResponse> {
        sampleSmartLinkResponse = new SmartLinkResponse();
        sampleSmartLinkResponse.set('data', 'Sample SmartLinkResponse');
        return Promise.resolve(sampleSmartLinkResponse);
      }

      prepareResponse(smartLinkResponse: SmartLinkResponse, res: Response): void {
        res.status(200).json(smartLinkResponse);
      }
    }

    mockRequestPreparer = new MockRequestPreparer();
    collectParamsSpy = jest.spyOn(mockRequestPreparer, 'collectParams');
    resolveSmartLinkSpy = jest.spyOn(mockRequestPreparer, 'resolveSmartLink');
    prepareResponseSpy = jest.spyOn(mockRequestPreparer, 'prepareResponse');
  });

  it('should call collectParams, resolveSmartLink, and prepareResponse in process', async () => {
    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await mockRequestPreparer.process(mockReq, mockRes);

    expect(collectParamsSpy).toHaveBeenCalledWith(mockReq);
    expect(resolveSmartLinkSpy).toHaveBeenCalledWith(sampleSmartLinkRequest);
    expect(prepareResponseSpy).toHaveBeenCalledWith(sampleSmartLinkResponse, mockRes);
  });
});
