import sinon from "sinon";
import { ProcessStrategyB } from "../../src/core/request/process-strategy-b";

export const mockProcessStrategyB = () : Partial<ProcessStrategyB> => ({
    process: sinon.stub()
});
