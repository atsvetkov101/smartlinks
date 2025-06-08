import { RequestResolverImpl } from './request-resolver-impl';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';

import { ConditionDictionary } from '../conditions/condition-dictionary';
import { PathRulesEntity } from '../../database/path-rules/path-rules.entity';
import { RulesBuilder } from './rule/rules-builder';
import { LoggerService } from '../../logger/logger.service';
import { ResponseInfo } from './rule/response-info';
import { PathRulesRepository } from '../../database/path-rules/path-rules.repositry';
import { Rule } from './rule/rule';
import path from 'path';

const getConditionDictionary = async () => {
  process.env.CONDITIONS_DIRECTORY = '../../../jest-test/conditions/test-conditions';

  const conditionFullPath = path.join(__dirname, process.env.CONDITIONS_DIRECTORY);
  console.log(`Директория для условий: ${conditionFullPath}`);
  const conditionDictionary = new ConditionDictionary();
  conditionDictionary.setConditionDirectory(conditionFullPath)

  await conditionDictionary.init();
  conditionDictionary.compileConditions();

  const keys = conditionDictionary.getConditionKeys();
  console.log(`Ключи условий: ${keys}`);
  return conditionDictionary;
};

describe('RequestResolverImpl', () => {
  let resolver: RequestResolverImpl;
  let pathRulesRepository: jest.Mocked<PathRulesRepository>;
  let conditionDictionary: ConditionDictionary;
  let loggerService: jest.Mocked<LoggerService>;
  let rulesBuilder: jest.Mocked<RulesBuilder>;
  let mockRule: Rule;

  beforeEach(async () => {
    pathRulesRepository = {
      findRules: jest.fn(),
    } as any;

    conditionDictionary = await getConditionDictionary();

    loggerService = {
      log: jest.fn(),
      error: jest.fn(),
    } as any;

    rulesBuilder = {
      init: jest.fn().mockResolvedValue(undefined),
      append: jest.fn().mockReturnThis(),
      build: jest.fn().mockReturnValue([mockRule]),
    } as any;

    resolver = new RequestResolverImpl(
      pathRulesRepository,
      conditionDictionary,
      loggerService
    );
  });

  it('should return rules from repository in findRules', async () => {
    const mockRules = new PathRulesEntity({
      path: '/test',
      rules: [new Rule(loggerService)]
    });
    pathRulesRepository.findRules.mockResolvedValue(mockRules);

    const result = await resolver.findRules('/test');
    expect(result).toBe(mockRules);
  });

  it('should return null if no rules found in findRules', async () => {
    pathRulesRepository.findRules.mockResolvedValue(null);

    const result = await resolver.findRules('/non-existent');
    expect(result).toBeNull();
  });

  it('should return response info with rule url in chooseRule', async () => {
    const req = new SmartLinkRequest();
    const pathRules = new PathRulesEntity({
      path: '',
      rules: [new Rule(loggerService)]
    });
    const responseInfo = new ResponseInfo();
    responseInfo.url = 'http://example.com';

    jest.spyOn(resolver as any, 'prepareResponseInfo').mockReturnValue(responseInfo);
    const result = await resolver.chooseRule(req, pathRules);
    expect(result.url).toBe('http://example.com');
  });

  it('should return rule not found in chooseRule', async () => {
    const req = new SmartLinkRequest();
    const pathRules = new PathRulesEntity({
      path: '',
      rules: [new Rule(loggerService)]
    });
    (resolver as any).rulesBuilder = {
      init: jest.fn().mockResolvedValue(undefined),
      append: jest.fn().mockReturnThis(),
      build: jest.fn().mockReturnValue([]),
    } as any;

    const result = await resolver.chooseRule(req, pathRules);
    expect(result.ruleNotFound).toBe(true);
  });

  it('should return SmartLinkResponse with url in getResponse', async () => {
    const responseInfo = new ResponseInfo();
    responseInfo.url = 'http://example.com';
    const result = await resolver.getResponse(responseInfo);
    expect(result.url).toBe('http://example.com');
  });
});
