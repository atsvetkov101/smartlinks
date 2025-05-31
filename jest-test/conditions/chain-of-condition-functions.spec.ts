
import sinon from 'sinon';
import { Chain } from '../../src/core/chain/chain';
import { LoggerService } from '../../src/logger/logger.service';
import { ConditionExecutionHandler } from '../../src/core/chain/condition-execution-handler';
import { ICondition } from '../../src/core/interfaces/icondition';

const randomDecision = (num: number): boolean => {
  const probability = Math.abs(num) / 100; // Пример: num = 30 → 30% шанс true
  return Math.random() < probability;
};

class CheckDateAfter {
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}
    
    public static getConditionName(){
      return 'CheckDateAfter';
    }
    public getConditionResult() {
      const requestTimestamp = this.input['Date'];
      if(!requestTimestamp){
        return false;
      }
      const after = this.condition['After'];
      if(!after){
        return false;
      }
      return requestTimestamp > after;
    }
}

class CheckUserAgentIncludes {
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}
    
    public static getConditionName(){
      return 'CheckUserAgentIncludes';
    }
    public getConditionResult() {
      const userAgent: string = this.input['User-Agent'];
      if(!userAgent){
        return false;
      }
      const includes = this.condition['Includes'];
      if(!includes){
        return false;
      }
      return userAgent.toLowerCase().includes(includes.toLowerCase());
    }
}

describe('chain-of-condition functions tests', () => {
  describe('chain-of-condition functions tests', () => {

    let chain: Chain;
    beforeAll(() => {
      const loggerService = new LoggerService();
      const conditionExecutionHandler = new ConditionExecutionHandler(loggerService);
      chain = new Chain(conditionExecutionHandler, loggerService);
    });
    afterAll(() => {
    });
    it('chain-of-condition test - 2 условия', () => {
      
      const checkBrowser = new CheckUserAgentIncludes({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
      }, {
        'Includes': 'chrome'
      });

      const checkDateAfter = new CheckDateAfter({
        'Date': new Date('2020-01-01')
      }, {
        'After': new Date('2019-01-01')
      });
      const conditions = [(checkBrowser as ICondition), (checkDateAfter as ICondition)];
			const result = chain.start(conditions);
      expect(result).toBe(true);
    });
  });
});
