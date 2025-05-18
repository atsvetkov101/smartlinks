import { expect, assert } from 'chai';
import { before, after } from 'node:test';
import sinon from 'sinon';
import { RequestPreparerImpl } from '../src/core/request/request-preparer-impl';
import { Request } from "express";
import { mockRequestPreparerImpl } from './mocks/mock-request-preparer-impl';
import { mockProcessStrategyB } from './mocks/mock-process-strategy-b';
import { IProcessStrategy } from '../src/core/request/iprocess-strategy';
import mockRequest from './mocks/mock-request';
import mockResponse from './mocks/mock-response';

describe('RequestPreparerImpl tests', () => {
    describe('RequestPreparerImpl ProcessStrategyB tests', () => {
        let requestPreparerImpl;
        before(() => {
            const strategy = mockProcessStrategyB();
            /*
            requestPreparerImpl = new RequestPreparerImpl();
            */
        });
        after(() => {
            sinon.restore();
        });
        it.skip('RequestPreparerImpl Проверяем метод collectParams()', () => {
            const res = requestPreparerImpl.collectParams(mockRequest);
            const path = res.get('path');
            expect(res.get('path')).equals('/my-test-path');
            expect(res.get('requestTimestamp')).is.a.string;
        });
    });
});