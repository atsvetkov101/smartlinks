import { Request } from 'express';

export class MockRequest{
  url: string;
  body: any;
  params: any;
  query: any;

  constructor(body?: any, params?: any, query?: any, url?: string) {
    this.body = body || {};
    this.params = params || {};
    this.query = query || {};
    this.url = url || '';
  }
}
