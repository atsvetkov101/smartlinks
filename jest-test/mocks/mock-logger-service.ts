import { LoggerService } from "../../src/logger/logger.service";

export const mockLoggerService = () : Partial<LoggerService> => ({
    log: jest.fn()
});
