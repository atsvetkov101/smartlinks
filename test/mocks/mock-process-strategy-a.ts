import sinon from "sinon";
import { ProcessStrategyA } from "../../src/core/request/process-strategy-a";

export const mockProcessStrategyA = () : Partial<ProcessStrategyA> => ({
    process: sinon.stub()
});
