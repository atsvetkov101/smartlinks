import { RequestResolver } from './request-resolver';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { PathRulesEntity } from '../../database/path-rules/path-rules.entity';
import { ResponseInfo } from './rule/response-info';
import { expect, jest, test, beforeEach } from '@jest/globals';

class MockRequestResolver extends RequestResolver {
  constructor(
    private mockGetPath: (req: SmartLinkRequest) => string,
    private mockFindRules: (path: string) => Promise<PathRulesEntity>,
    private mockChooseRule: (
      req: SmartLinkRequest,
      rules: PathRulesEntity
    ) => Promise<ResponseInfo>,
    private mockGetResponse: (rule: ResponseInfo) => Promise<SmartLinkResponse>
  ) {
    super();
  }

  getPath(req: SmartLinkRequest): string {
    return this.mockGetPath(req);
  }

  async findRules(path: string): Promise<PathRulesEntity> {
    return this.mockFindRules(path);
  }

  async chooseRule(
    req: SmartLinkRequest,
    rules: PathRulesEntity
  ): Promise<ResponseInfo> {
    return this.mockChooseRule(req, rules);
  }

  async getResponse(rule: ResponseInfo): Promise<SmartLinkResponse> {
    return this.mockGetResponse(rule);
  }
}

describe('RequestResolver', () => {
  let resolver: MockRequestResolver;

  beforeEach(() => {
    resolver = new MockRequestResolver(
      (req) => req.get('url'),
      (path) => Promise.resolve({ path, rules: [] }),
      //ts-ignore
      (req, rules) => {
        const info = new ResponseInfo();
        return Promise.resolve(info);
      },
      (rule) => {
        const response = new SmartLinkResponse();
        response.set('redirectUrl', 'https://example.com');
        return Promise.resolve(response);
      }
    );
  });

  test('resolve should call all abstract methods and return a response', async () => {

    const mockRequest = new SmartLinkRequest();
    mockRequest.set('url', '/test');

    const result = await resolver.resolve(mockRequest);

   // expect(result).toHaveProperty('redirectUrl');
    expect(result.get('redirectUrl')).toBe('https://example.com');
  });
});
