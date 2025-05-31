import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { PathRulesRepository } from '../../database/path-rules/path-rules.repositry';

export abstract class RequestResolver {

  constructor() {}

  // Template Method pattern
  async resolve(req: SmartLinkRequest): Promise<SmartLinkResponse>{
    const path = this.getPath(req);

    const rules: any[] = await this.findRules(path);

    const rule = this.chooseRule(rules);

    return this.getResponse(rule);
  }

  abstract getPath(req: SmartLinkRequest);

  abstract findRules(path: string):  Promise<any[]>;

  abstract chooseRule(rules: Rule[]): Rule;
  
  abstract getResponse(rule: Rule): Promise<SmartLinkResponse>;
}
