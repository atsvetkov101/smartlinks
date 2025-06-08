import { BaseException } from './base-exception';
import { IBaseExceptionOptions } from './ibase-exception-options';

class CustomException extends BaseException {
  constructor({ error, errorCode }, options: IBaseExceptionOptions = {}) {
    super({ error, errorCode }, options);
  }
}

describe('BaseException', () => {
  it('should set error, errorCode, and originalError correctly', () => {
    const originalErr = new Error('Original error message');
    const baseErr = new CustomException({
      error: 'Test error message',
      errorCode: 'TEST001',
    }, {
      originalError: originalErr,
    });

    expect(baseErr.message).toBe('Test error message');
    expect(baseErr.errorCode).toBe('TEST001');
    expect(baseErr.error).toBe('Test error message');
    expect(baseErr.originalError).toBe(originalErr);
    expect(baseErr.getOriginalError()).toBe(originalErr);
    expect(baseErr.getErrorCode()).toBe('TEST001');
    expect(baseErr.getError()).toBe('Test error message');
  });

  it('should not set originalError if not provided', () => {
    const baseErr = new CustomException({
      error: 'Test error message',
      errorCode: 'TEST001',
    });

    expect(baseErr.originalError).toBeUndefined();
    expect(baseErr.getOriginalError()).toBeUndefined();
  });

  it('should capture stack trace correctly', () => {
    const baseErr = new CustomException({
      error: 'Test error message',
      errorCode: 'TEST001',
    });

    const stack = baseErr.stack as string;

    expect(stack).toContain('Test error message');
    expect(stack).toContain('at Object.<anonymous>');
  });
});
