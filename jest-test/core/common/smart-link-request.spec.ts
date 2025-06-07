import { SmartLinkRequest } from "../../../src/core/common/smart-link-request";


describe('SmartLinkRequest', () => {
  let request: SmartLinkRequest;

  beforeEach(() => {
    request = new SmartLinkRequest();
  });

  it('should set a key-value pair and get the value', () => {
    request.set('key1', 'value1');
    const value = request.get('key1');
    expect(value).toBe('value1');
  });

  it('should return undefined for a non-existent key', () => {
    const value = request.get('key2');
    expect(value).toBeUndefined();
  });

  it('should handle multiple key-value pairs', () => {
    request.set('key1', 'value1');
    request.set('key2', 123);
    request.set('key3', true);

    expect(request.get('key1')).toBe('value1');
    expect(request.get('key2')).toBe(123);
    expect(request.get('key3')).toBe(true);
  });

  it('should override existing key with new value', () => {
    request.set('key1', 'oldValue');
    request.set('key1', 'newValue');

    expect(request.get('key1')).toBe('newValue');
  });
});