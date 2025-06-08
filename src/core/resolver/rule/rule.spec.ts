import { Rule } from "./rule";
import { LoggerService } from "../../../logger/logger.service";
import { ConditionExecutionHandler } from "../../chain/condition-execution-handler";
import { Chain } from "../../chain/chain";
import { after } from "node:test";

describe("Rule", () => {
  let rule: Rule;

  let mockLoggerService;
  beforeEach(() => {
    jest.clearAllMocks();

    mockLoggerService = {
      log: jest.fn(),
    } as any;
    rule = new Rule(mockLoggerService);

  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  
  it("should initialize id in constructor", () => {
    expect(rule.id).toBeDefined();
  });

  it("should set url, on init", () => {
    rule.init("https://example.com", {});
    expect(rule.url).toBe("https://example.com");
  });

  it("should return the current chain in getConditionChain", () => {
    const mockChain = {} as Chain;
    rule.chain = mockChain;
    expect(rule.getConditionChain()).toBe(mockChain);
  });
});
