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
  /*
  describe('chain-of-condition tests 1', () => {
    let chain: Chain;
    let sandbox: sinon.SinonSandbox;
    let conditionExecutionHandler;
    before(() => {
      sandbox = sinon.createSandbox();
      sinon.stub(ConditionExecutionHandler.prototype, 'handleCondition').callsFake((conditions)) => {
        s3FileLink = `http://s3.url.test/${fileLink}`;
        return s3FileLink;
      });
      const loggerService = new LoggerService();
      conditionExecutionHandler = new ConditionExecutionHandler(loggerService);
      chain = new Chain(conditionExecutionHandler, loggerService);

    });
    after(async () => {
      sandbox.restore();
    });
    it.only('chain-of-condition condition test. проверяем, что метод handleCondition был вызван', async () => {
      const spy = sandbox.spy(conditionExecutionHandler, 'handleCondition');

      const conditions = [1,2,3,4,5,6,7,8,9,10];
			const result = chain.start(conditions);
      chai.assert(spy.calledOnce, 'Приватный метод не был вызван');
    });
  });
*/  
});
