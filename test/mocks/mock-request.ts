import { Request } from 'express';

const mockRequest: Partial<Request> = {
  path: '/my-test-path',
  ip: '192.168.0.1',
  httpVersion: '1.1',
  method: 'GET',
  hostname: 'localhost',
  url: '/test',
  headers: {
    'content-type': 'application/json',
    'some-header': 'some-value'
  },
  query: {name: 'John', age: '30'},
};

export default mockRequest;
