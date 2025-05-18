import { ApplicationError } from './application-error';

type ExceptionHandlerFunction = (e: ApplicationError) => void;
export { ExceptionHandlerFunction };
