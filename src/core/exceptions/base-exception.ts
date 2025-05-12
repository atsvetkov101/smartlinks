import { IBaseExceptionOptions } from "./ibase-exception-options";

export abstract class BaseException extends Error { 
  errorCode: string;
  error: string;
  originalError: Error | undefined;
  protected constructor({ error, errorCode}, options: IBaseExceptionOptions = {}) {
    super(error);
    Error.captureStackTrace(this, this.constructor);
    this.errorCode = errorCode;
    this.error = error;

    const { originalError = undefined } = options;
    this.originalError = originalError;
  }
}
