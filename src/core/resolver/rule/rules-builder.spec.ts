import { Test, TestingModule } from '@nestjs/testing';


import { RulesBuilder } from '../../../core/resolver/rule/rules-builder';


import { Rule } from '../../../core/resolver/rule/rule';

import { CustomHttpException } from '../../../core/exceptions/custom-http-exception';
import { LoggerService } from '../../../logger/logger.service';
import { ConditionDictionary } from '../../conditions/condition-dictionary';
import { SmartLinkRequest } from '../../common/smart-link-request';
import { Chain } from '../../chain/chain';
import { TestRandomDecisionConditionExecutionHandler } from '../../../../jest-test/conditions/test-random-decision-condition-execution-handler';
import path from 'node:path';

const createTestChain = () => {
  const loggerService = new LoggerService();
  const conditionExecutionHandler = new TestRandomDecisionConditionExecutionHandler(loggerService);
  const chain = new Chain(conditionExecutionHandler, loggerService);
  return chain;
};

const getConditionDictionary = async () => {
  process.env.CONDITIONS_DIRECTORY = '../../../../jest-test/conditions/test-conditions';

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

describe('RulesBuilder', () => {
  let rulesBuilder: RulesBuilder;
  let loggerService: LoggerService;
  let conditionDictionary: ConditionDictionary;
  let ruleEntity: object;

  const mockRule = {
    init: jest.fn(),
    getConditionChain: jest.fn(),
  };

  const mockCondition = {
    new: jest.fn(),
  };

  const mockChain = {
    pushCondition: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    loggerService = {
      error: jest.fn(),
    } as unknown as LoggerService;

    /*
    conditionDictionary = {
      init: jest.fn(),
      getCondition: jest.fn((id) => id),
    } as unknown as ConditionDictionary;
*/
    conditionDictionary = await getConditionDictionary();
    const input = new SmartLinkRequest();
    input['data'] = { data: { key: 'value' }, headers: { 'x-request-id': '123' } };

    rulesBuilder = new RulesBuilder(input, conditionDictionary, loggerService);
    await rulesBuilder.init();

    ruleEntity = {
      url: '/test',
      conditions: [
        { id: 'CheckDateBefore', conditionData: 'someData' },
        { id: 'CheckRequestTimestampBetween', conditionData: 'anotherData' },
      ],
    };
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('append', () => {
    it('should append a rule correctly with conditions', async () => {
      const spy = jest.spyOn(Rule.prototype, 'getConditionChain').mockImplementation(() => createTestChain() as unknown as Chain);
      const ruleMock = jest.spyOn(Rule.prototype, 'init').mockImplementation(() => {});
      const chain = createTestChain() as unknown as Chain;

      Object.defineProperty(Rule, 'getConditionChain', {
        value: jest.fn(() => chain),
        configurable: true
      });

      const spyChainPushCondition = jest.spyOn(Chain.prototype, 'pushCondition');
      // chain.pushCondition = jest.fn();

      await (await rulesBuilder.append(ruleEntity, new SmartLinkRequest())).build();
      expect(Rule.prototype.init).toHaveBeenCalledWith(ruleEntity['url'], expect.any(Object));
      expect(spyChainPushCondition).toHaveBeenCalledTimes(2);
    });

    it('should log an error when creating a condition fails', async () => {
      /*
      const conditionDictionaryMock = conditionDictionary.getCondition as any;
      conditionDictionaryMock.mockImplementationOnce((id) => {
        throw new Error('Condition not found');
      });
*/
      conditionDictionary.getCondition = jest.fn(() => {
        throw new Error('Condition not found');
      });

      const mockChainPushFunction = jest.fn().mockImplementation(() => {
        throw new Error('Condition execution failed');
      });

      const chainSpy = jest.spyOn(Chain.prototype, 'pushCondition').mockImplementation(mockChainPushFunction);
      const ruleMock = jest.spyOn(Rule as any, 'getConditionChain').mockImplementation(() => createTestChain() as any);

      Object.defineProperty(Rule, 'getConditionChain', {
        value: jest.fn(() => chainSpy),
        configurable: true
      });

      await (await rulesBuilder.append(ruleEntity, new SmartLinkRequest())).build();
      expect(loggerService.error).toHaveBeenCalledTimes(1);
    });

    it('should append a rule without conditions to a default chain', async () => {
      ruleEntity = { url: '/test', conditions: undefined };

      const ruleMock = jest.spyOn(Rule.prototype, 'init').mockImplementation(() => {});
      const chainSpy = jest.spyOn(Rule.prototype, 'getConditionChain').mockImplementation(() => createTestChain() as any);
      const loggerSpy = jest.spyOn(LoggerService.prototype, 'error');

      await rulesBuilder.append(ruleEntity, new SmartLinkRequest());
      const rules = rulesBuilder.build();
      expect(rules.length).toEqual(1);
    });
  });
/*
  describe('appendRules', () => {
    it('should append multiple rule entities and build rules', () => {
      const ruleEntityList = [
        { url: '/test1', conditions: [{ id: '1', conditionData: 'someData' }] },
        { url: '/test2', conditions: [{ id: '2', conditionData: 'anotherData' }] },
      ];

      const ruleMock1 = {
        init: jest.fn(),
        getConditionChain: jest.fn((...args) => {
          const chain = new Chain() as any;
          chain.pushCondition = jest.fn();
          return chain;
        }),
      };
      const ruleMock2 = { init: jest.fn(), getConditionChain: jest.fn(() => new Chain() as any) };

      const ruleSpy = jest.spyOn(Rule, 'prototype' as any, 'init').mockImplementation(() => {});
      const chainSpy1 = jest
        .spyOn(Rule, 'prototype' as any, 'getConditionChain')
        .mockImplementationOnce(() => new Chain() as any);
      const chainSpy2 = jest
        .spyOn(Rule, 'prototype' as any, 'getConditionChain')
        .mockImplementationOnce(() => new Chain() as any);

      jest
        .spyOn(ruleMock1 as any, 'init')
        .mockImplementation((url: string, data: any) => {
          if (url === '/test1' && data.key === 'value') {
            return undefined;
          }
          throw new CustomHttpException('Invalid condition instance'); 
        });

      jest
        .spyOn(ruleMock2 as any, 'init')
        .mockImplementation((url: string, data: any) => {
          if (url === '/test2' && data.key === 'value') {
            return undefined;
          }
          throw new CustomHttpException('Invalid condition instance');
        });

      rulesBuilder = new RulesBuilder(new SmartLinkRequest(), conditionDictionary, loggerService);
      rulesBuilder.appendRules(ruleEntityList);

      expect(rulesBuilder.build().length).toBe(2);
    });
  });
*/  
});
