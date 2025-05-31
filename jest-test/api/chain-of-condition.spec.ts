
import sinon from 'sinon';
import { Chain } from '../../src/core/chain/chain';
import { LoggerService } from '../../src/logger/logger.service';
import { TestRandomDecisionConditionExecutionHandler } from '../conditions/test-random-decision-condition-execution-handler';
import { ICondition } from '../../src/core/interfaces/icondition';

class TestCondition implements ICondition {
  getConditionResult(): boolean {
    return true;
  }
}

describe('chain-of-condition tests', () => {
  describe('chain-of-condition tests', () => {

    let chain: Chain;
    beforeAll(() => {
      const loggerService = new LoggerService();
      const conditionExecutionHandler = new TestRandomDecisionConditionExecutionHandler(loggerService);
      chain = new Chain(conditionExecutionHandler, loggerService);
    });
    afterAll(() => {
    });
    it('chain-of-condition random condition test', () => {
      
      const conditions = [new TestCondition(),new TestCondition(),new TestCondition(),new TestCondition(),new TestCondition()
        ,new TestCondition(),new TestCondition(),new TestCondition(),new TestCondition(),new TestCondition()];
			const result = chain.start(conditions);
			console.log(`Finished result = ${result}`)

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
    });
  });
});
