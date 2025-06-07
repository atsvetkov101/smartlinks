import { SmartLinkResponse } from './smart-link-response';

describe('SmartLinkResponse', () => {
  let smartLinkResponse: SmartLinkResponse;

  beforeEach(() => {
    smartLinkResponse = new SmartLinkResponse();
  });

  it('should initialize with empty data object', () => {
    expect(smartLinkResponse.get('url')).toBeUndefined();
  });

  it('should set and get url correctly', () => {
    const testUrl = 'https://example.com';
    smartLinkResponse.url = testUrl;
    expect(smartLinkResponse.url).toBe(testUrl);
    expect(smartLinkResponse.get('url')).toBe(testUrl);
  });

  it('should set and get status correctly', () => {
    const testStatus = 404;
    smartLinkResponse.status = testStatus;
    expect(smartLinkResponse.status).toBe(testStatus);
    expect(smartLinkResponse.get('status')).toBe(testStatus.toString());
  });

  it('should handle setting and getting arbitrary keys', () => {
    const testKey = 'testKey';
    const testValue = 'testValue';
    smartLinkResponse.set(testKey, testValue);
    expect(smartLinkResponse.get(testKey)).toBe(testValue);
  });

  it('should return undefined for a non-existent key', () => {
    const testKey = 'nonExistentKey';
    expect(smartLinkResponse.get(testKey)).toBeUndefined();
  });

  it('should return url as null if it was not set', () => {
    expect(smartLinkResponse.url).toBeUndefined();
  });

  it('should return status as NaN if it was not set', () => {
    expect(smartLinkResponse.status).toBeNaN();
  });
});
