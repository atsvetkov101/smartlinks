import { RequestPreparer } from "../../src/core/request/request-preparer";

export const mockRequestPreparer = () : Partial<RequestPreparer> => ({
  process: jest.fn(),
  collectParams: jest.fn(),
  resolveSmartLink: jest.fn(),
  prepareResponse: jest.fn(),
});