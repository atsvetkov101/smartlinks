import sinon from "sinon";
import { LoggerService } from "../../src/logger/logger.service";

export const mockLoggerService = () : Partial<LoggerService> => ({
    log: sinon.stub()
});
