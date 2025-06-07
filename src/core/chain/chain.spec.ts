import { ConditionExecutionHandler } from "./condition-execution-handler";
import { LoggerService } from "../../logger/logger.service";
import { Chain } from "./chain";
import { ICondition } from "../interfaces/icondition";

describe("Chain", () => {
  let chain: Chain;
  let mockConditionExecutionHandler: jest.Mocked<ConditionExecutionHandler>;
  let mockLoggerService: jest.Mocked<LoggerService>;
  let mockCondition: jest.Mocked<ICondition>;

  beforeEach(() => {
    mockConditionExecutionHandler = {
      handle: jest.fn(() => true),
    } as any;
    mockLoggerService = {
      log: jest.fn(),
    } as any;
    mockCondition = {
      check: jest.fn(() => true),
    } as any;

    chain = new Chain(mockConditionExecutionHandler, mockLoggerService);
  });

  it("should return true when no conditions are present", () => {
    expect(chain.start(null)).toBe(true);
  });

  it("should return true when external conditions are empty", () => {
    expect(chain.start([])).toBe(true);
  });

  it("should use internal conditions if external is not provided", () => {
    chain.pushCondition(mockCondition);
    chain.start(null);
    expect(mockConditionExecutionHandler.handle).toHaveBeenCalledWith([mockCondition]);
  });

  it("should use external conditions if provided", () => {
    const externalConditions = [mockCondition];
    chain.start(externalConditions);
    expect(mockConditionExecutionHandler.handle).toHaveBeenCalledWith(externalConditions);
  });

  it("should log the correct message when conditions are added in chain", () => {
    chain.pushCondition(mockCondition);
    chain.start(null);
    expect(mockLoggerService.log).toHaveBeenCalledWith(`Starting chain with 1 conditions`);
  });

  it("should return the result of conditionExecutionHandler handle", () => {
    mockConditionExecutionHandler.handle.mockReturnValue(false);
    chain.pushCondition(mockCondition);
    expect(chain.start(null)).toBe(false);
  });
});
