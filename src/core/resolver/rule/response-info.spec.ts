import { ResponseInfo } from './response-info';

describe('ResponseInfo', () => {
  it('should create an instance with default status', () => {
    const responseInfo = new ResponseInfo();
    expect(responseInfo).toBeTruthy();
    expect(responseInfo.status).toBe(200);
    expect(responseInfo.url).toBeUndefined();
    expect(responseInfo.ruleNotFound).toBe(false);
  });

  it('should create an instance with provided status', () => {
    const responseInfo = new ResponseInfo(301);
    expect(responseInfo.status).toBe(301);
  });

  it('should set and get url', () => {
    const responseInfo = new ResponseInfo();
    const testUrl = 'https://example.com';
    responseInfo.url = testUrl;
    expect(responseInfo.url).toBe(testUrl);
  });

  it('should set and get status', () => {
    const responseInfo = new ResponseInfo();
    const testStatus = 404;
    responseInfo.status = testStatus;
    expect(responseInfo.status).toBe(testStatus);
  });

  it('should set and get ruleNotFound', () => {
    const responseInfo = new ResponseInfo();
    responseInfo.ruleNotFound = true;
    expect(responseInfo.ruleNotFound).toBe(true);
  });
});
