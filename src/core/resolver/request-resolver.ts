import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { PathRulesRepository } from '../../database/path-rules/path-rules.repositry';
import { Rule } from './rule/rule';
import { PathRulesEntity } from '../../database/path-rules/path-rules.entity';
import { ResponseInfo } from './rule/response-info';

export abstract class RequestResolver {

  constructor() {}

  // Template Method pattern
  async resolve(req: SmartLinkRequest): Promise<SmartLinkResponse>{
    const path = this.getPath(req);

    const rules: any = await this.findRules(path);

    const responseInfo = await this.chooseRule(req, rules);

    return this.getResponse(responseInfo);
  }

  abstract getPath(req: SmartLinkRequest);

  abstract findRules(path: string):  Promise<PathRulesEntity>;

  abstract chooseRule(req: SmartLinkRequest, rules: PathRulesEntity): Promise<ResponseInfo>;
  
  abstract getResponse(rule: ResponseInfo): Promise<SmartLinkResponse>;
}
