import { Test, TestingModule } from '@nestjs/testing';
import { BASE_HANDLER, ExceptionHandler } from './exception-handler';
import { ExceptionHandlerConfig } from './exception-handler-config';
import { ApplicationError } from './application-error';
import { ExceptionHandlerFunction } from './exception-handler-function';
import { after } from 'node:test';

describe('ExceptionHandler', () => {
  let exceptionHandler: ExceptionHandler;
  let config: ExceptionHandlerConfig;
  let lastCalledHandler:string = null;

  let mockHandler;
  let mockBaseHandler;
  beforeEach(async () => {
    mockHandler = jest.fn((error: ApplicationError) => {
      // mock implementation
      lastCalledHandler = 'mockHandler';
    });

    mockBaseHandler = jest.fn((error: ApplicationError) => {
      // mock implementation
      lastCalledHandler = 'mockBaseHandler';
    });

    config = {
      getHandlers: jest.fn().mockImplementation(() => {
        return new Map([
          [1, mockHandler],
          [BASE_HANDLER, mockBaseHandler]
        ]);
      })
    } as unknown as ExceptionHandlerConfig;

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ExceptionHandler, ExceptionHandlerConfig],
    })
    .overrideProvider(ExceptionHandlerConfig)
    .useValue(config)
    .compile();

    exceptionHandler = module.get<ExceptionHandler>(ExceptionHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle ErrorNumber specific handler', () => {
    const error = new ApplicationError(1, 'Test error');

    exceptionHandler.handle(error);

    expect(mockHandler).toHaveBeenCalledWith(error);
    expect(mockBaseHandler).not.toHaveBeenCalled();
  });

  it('should handle with the base handler when specific handler is not found', () => {
    const error = new ApplicationError(3, 'Test error');

    exceptionHandler.handle(error);

    expect(mockHandler).not.toHaveBeenCalled();
    expect(mockBaseHandler).toHaveBeenCalledWith(error);
  });

  it('should handle with the base handler for non-ApplicationErrors', () => {
    const error = new Error('Test error 1');

    exceptionHandler.handle(error);

    expect(mockHandler).not.toHaveBeenCalled();
    expect(mockBaseHandler).toHaveBeenCalledWith(error);
  });

  it('should handle with the base handler for unknown type', () => {
    const error = new Error('Test error 2');

    exceptionHandler.handle(error);

    expect(mockHandler).not.toHaveBeenCalled();
    expect(mockBaseHandler).toHaveBeenCalledWith(error);
  });
});
