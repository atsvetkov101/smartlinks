import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionHandlerConfig } from './exception-handler-config';
import { LoggerService } from '../../logger/logger.service';
import { ApplicationError } from './application-error';

describe('ExceptionHandlerConfig', () => {
  let exceptionHandlerConfig: ExceptionHandlerConfig;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExceptionHandlerConfig,
        {
          provide: LoggerService,
          useValue: {
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    exceptionHandlerConfig = module.get<ExceptionHandlerConfig>(ExceptionHandlerConfig);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(exceptionHandlerConfig).toBeDefined();
  });

  describe('getHandlers', () => {
    it('should return a map with 2 exception handlers', () => {
      const handlers = exceptionHandlerConfig.getHandlers();
      expect(handlers).toBeInstanceOf(Map);
      expect(handlers.size).toBe(2);
      
      const defaultHandler = handlers.get(0);
      expect(defaultHandler).toBeDefined();
      const validationHandler = handlers.get(5001);
      expect(validationHandler).toBeDefined();
    });

    it('should log the error message for default handler', () => {
      const handlers = exceptionHandlerConfig.getHandlers();
      const defaultMessage = 'Test message';
      const error = new ApplicationError(5002, defaultMessage);
      
      const defaultHandler = handlers.get(0);
      defaultHandler(error);
      
      expect(loggerService.error).toHaveBeenCalledWith(`Неизвестная ошибка: ${error.message} ${error?.stack}`);
    });

    it('should log the validation error message for the 5001 handler', () => {
      const handlers = exceptionHandlerConfig.getHandlers();
      const validationMessage = 'Validation error occurred';
      const error = new ApplicationError(5001, validationMessage);
      
      const validationHandler = handlers.get(5001);
      validationHandler(error);
      
      expect(loggerService.error).toHaveBeenCalledWith(`Ошибка валидации запроса: ${error.message}`);
    });
  });
});
