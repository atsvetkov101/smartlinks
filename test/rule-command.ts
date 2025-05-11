import { expect, assert } from 'chai';
import { before, after } from 'node:test';
import { RuleCommand } from '../src/core/rule-command';
import sinon from 'sinon';

describe('RuleCommand tests', () => {
  describe('RuleCommand tests', () => {
    const messages: string[] = [];
    before(() => {
      sinon.stub(console, 'log').callsFake((message) => messages.push(message));
    });
    after(() => {
      sinon.restore();
    });
    it('RuleCommand test', () => {
      const command = new RuleCommand({});
      expect(command).not.to.be.undefined;
      expect(command).not.to.be.null; 
    });
    it('RuleCommand GetType test', () => {
      const command = new RuleCommand({});
      const type = command.getType();
      expect(type).to.equal('RuleCommand');
    });
  });
});
