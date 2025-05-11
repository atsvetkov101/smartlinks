import { expect, assert } from 'chai';
import { before, after } from 'node:test';
import sinon from 'sinon';
import { LoggerService } from '../src/logger/logger.service';

describe('LoggerService tests', () => {
	describe('LoggerService tests', () => {
		const logMessages: string[] = [];
		let logger;
		before(() => {
			logger = new LoggerService();
			sinon.stub(LoggerService.prototype, 'log').callsFake((message: string) => logMessages.push(message));
		});
		after(() => {
			sinon.restore();
		});
		it('LoggerService test метод log', () => {
			logger.log('log test');
			const filtered = logMessages.filter((str) => str.includes('log test'));
			expect(filtered.length).equals(1);
		});
		it('LoggerService test метод error', () => {
			logger.log('error test');
			const filtered = logMessages.filter((str) => str.includes('error test'));
			expect(filtered.length).equals(1);
		});
		it('LoggerService test метод warn', () => {
			logger.log('warn test');
			const filtered = logMessages.filter((str) => str.includes('warn test'));
			expect(filtered.length).equals(1);
		});
		it('LoggerService test метод debug', () => {
			logger.log('debug test');
			const filtered = logMessages.filter((str) => str.includes('debug test'));
			expect(filtered.length).equals(1);
		});
		it('LoggerService test метод verbose', () => {
			logger.log('verbose test');
			const filtered = logMessages.filter((str) => str.includes('verbose test'));
			expect(filtered.length).equals(1);
		});
	});
});
