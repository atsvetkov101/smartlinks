import { expect, assert } from 'chai';
import { before, after } from 'node:test';
import sinon from 'sinon';

describe('Dummy tests', () => {
	describe('dummy tests', () => {
		const messages: string[] = [];
		before(() => {
			sinon.stub(console, 'log').callsFake((message) => messages.push(message));
		});
		after(async () => {
			sinon.restore();
		});
		it('dummy test', async () => {
			expect(true).equals(true);
		});
	});
});
