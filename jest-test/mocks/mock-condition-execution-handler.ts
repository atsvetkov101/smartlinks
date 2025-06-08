import { LoggerService } from "../../src/logger/logger.service";
import { ConditionExecutionHandler } from "../../src/core/chain/condition-execution-handler";

export const mockConditionExecutionHandler = () : Partial<ConditionExecutionHandler> => ({
    handle: jest.fn(),
});
