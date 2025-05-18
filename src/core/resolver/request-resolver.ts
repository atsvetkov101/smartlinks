import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { PathRulesRepository } from '../../database/path-rules/path-rules.repositry';

export abstract class RequestResolver {

  constructor() {}

  async resolve(req: SmartLinkRequest): Promise<SmartLinkResponse>{
    const path = this.getPath(req);

    const rules: Rule[] = this.findRules(path);

    const rule = this.chooseRule(rules);

    return this.getResponse(rule);
  }

  abstract getPath(req: SmartLinkRequest);

  abstract chooseRule(rules: Rule[]): Rule;
  
  abstract getResponse(rule: Rule): Promise<SmartLinkResponse>;

  abstract findRules(path: string): Rule[];
}