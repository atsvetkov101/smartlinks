import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import { LoggerService } from '../../logger/logger.service';
import { RequestPreparer } from './request-preparer';
import { ExceptionHandler } from '../error/exception-handler';
import { Request, Response } from 'express';
import { of } from 'rxjs';

describe('RequestService', () => {
  let requestService: RequestService;
  let loggerService: LoggerService;
  let requestPreparer: RequestPreparer;
  let exceptionHandler: ExceptionHandler;

  const mockRequest = {
    url: '/test-url',
  } as Request;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as Partial<Response> as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestService,
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: RequestPreparer,
          useValue: {
            process: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: ExceptionHandler,
          useValue: {
            handleException: jest.fn(),
          },
        },
      ],
    }).compile();

    requestService = module.get<RequestService>(RequestService);
    loggerService = module.get<LoggerService>(LoggerService);
    requestPreparer = module.get<RequestPreparer>(RequestPreparer);
    exceptionHandler = module.get<ExceptionHandler>(ExceptionHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(requestService).toBeDefined();
    expect(loggerService).toBeDefined();
    expect(requestPreparer).toBeDefined();
    expect(exceptionHandler).toBeDefined();
  });

  it('should call loggerService.log with correct message', async () => {
    await requestService.process(mockRequest, mockResponse);

    expect(loggerService.log).toHaveBeenCalledWith(
      expect.stringContaining(mockRequest.url)
    );
  });

  it('should call requestPreparer.process with provided req and res', async () => {
    await requestService.process(mockRequest, mockResponse);

    expect(requestPreparer.process).toHaveBeenCalledWith(mockRequest, mockResponse);
  });

  it('should return resolved promise', async () => {
    const result = requestService.process(mockRequest, mockResponse);

    expect(result).toBeInstanceOf(Promise);
    const resolvedRes = await result;
    expect(resolvedRes).toBeUndefined();
  });
});
