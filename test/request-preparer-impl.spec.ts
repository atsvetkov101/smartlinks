import { expect, assert } from 'chai';
import { before, after } from 'node:test';
import sinon from 'sinon';
import { RequestPreparerImpl } from '../src/core/request/request-preparer-impl';
import mockRequest from './mocks/mock-request';
import { Request } from "express";


describe('RequestPreparerImpl tests', () => {
    describe('RequestPreparerImpl tests', () => {
        let requestPreparerImpl;
        before(() => {
            requestPreparerImpl = new RequestPreparerImpl();
        });
        after(() => {
            sinon.restore();
        });
        it('RequestPreparerImpl Проверяем метод collectParams()', () => {
            const res = requestPreparerImpl.collectParams(mockRequest);
            const path = res.get('path');
            expect(res.get('path')).equals('/my-test-path');
            expect(res.get('requestTimestamp')).is.a.string;
        });
    });
});