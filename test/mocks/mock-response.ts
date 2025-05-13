import { Response } from 'express';
import * as sinon from 'sinon';

export class MockResponse {
  status: (code: number) => MockResponse;
  send: (body: any) => void;
  json: (body: any) => void;

  private _status: number;
  private _sentBody: any;

  constructor() {
    this._status = null;
    this._sentBody = null;

    this.status = sinon.fake((code: number) => {
      this._status = code;
      return this;
    });

    this.send = sinon.fake((body: any) => {
      this._sentBody = body;
    });

    this.json = sinon.fake((body: any) => {
      this._sentBody = body;
    });
  }

  get statusCode(): number {
    return this._status;
  }

  get sentBody(): any {
    return this._sentBody;
  }
}
