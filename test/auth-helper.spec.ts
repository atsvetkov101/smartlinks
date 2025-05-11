import { expect } from 'chai';
import { before, after } from 'node:test';
import sinon from 'sinon';
import { AuthHelper } from '../src/core/auth/auth-helper';

describe('auth-helper tests', () => {
  describe('auth-helper tests', () => {
    const messages: string[] = [];
    before(() => {
      sinon.stub(console, 'log').callsFake((message) => messages.push(message));
    });
    after(() => {
      sinon.restore();
    });
    it('auth-helper test успешный логин', async () => {
      const result = await AuthHelper.login(
        'Alex',
        'alex$secret_password',
      );
      expect(result).equals(true);
    });
    it('auth-helper test ошибочный логин', async () => {
      const result = await AuthHelper.login(
        'Alex',
        'wrong_password',
      );
      expect(result).equals(false);
    });
  });
});
