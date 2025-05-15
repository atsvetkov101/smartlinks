import { expect } from 'chai';
import { before, after } from 'node:test';
import sinon from 'sinon';
import { ConditionExecutionHandler } from '../src/core/chain/condition-execution-handler';
import { LoggerService } from '../src/logger/logger.service';
import { Chain } from '../src/core/chain/chain';

const randomDecision = (num: number): boolean => {
  const probability = Math.abs(num) / 100; // Пример: num = 30 → 30% шанс true
  return Math.random() < probability;
};

describe('chain-of-condition tests', () => {
  describe('chain-of-condition tests', () => {

    let chain: Chain;
    before(() => {
      const loggerService = new LoggerService();
      const conditionExecutionHandler = new ConditionExecutionHandler(loggerService);
      chain = new Chain(conditionExecutionHandler, loggerService);
    });
    after(() => {
    });
    it('chain-of-condition random condition test', () => {
      
      const conditions = [1,2,3,4,5,6,7,8,9,10];
			const result = chain.start(conditions);
			console.log(`Finished result = ${result}`)

      expect(result).not.to.be.undefined;
      expect(result).not.to.be.null;
    });
  });
});
