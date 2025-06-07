import { LoggerService } from "../../src/logger/logger.service";
import { BaseConditionExecutionHandler } from "../../src/core/chain/base-condition-execution-handler";

export const MockBaseConditionExecutionHandler = () : Partial<BaseConditionExecutionHandler> => ({
    handle: jest.fn(),
});
