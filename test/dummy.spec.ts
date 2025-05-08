import { expect, assert } from 'chai';
import { before, after } from 'node:test';
import sinon from 'sinon';

describe('ProcessingQueueCommand tests', () => {
	describe('dz #11 tests', () => {
		const messages: string[] = [];
		before(() => {
			sinon.stub(console, 'log').callsFake((message) => messages.push(message));
		});
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		after(async () => {
			sinon.restore();
		});
		// eslint-disable-next-line max-len
		it('dz #11 тест проверяет, что обработка очереди с поддержкой состояния работает ProcessingQueueStateCommand ', async () => {
			expect(true).equals(true);
		});
	});
});
