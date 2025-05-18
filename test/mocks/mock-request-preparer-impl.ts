import sinon from "sinon";
import { ProcessStrategyB } from "../../src/core/request/process-strategy-b";
import { RequestPreparerImpl } from "../../src/core/request/request-preparer-impl";

export const mockRequestPreparerImpl = () : Partial<RequestPreparerImpl> => ({
  process: sinon.stub(),
  collectParams: sinon.stub(),
  resolveSmartLink: sinon.stub(),
  prepareResponse: sinon.stub(),
});
