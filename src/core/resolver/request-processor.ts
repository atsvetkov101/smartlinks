import { LinkRepository } from './link-repository';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';

abstract class RequestResolver {

  constructor(private linkRepository: LinkRepository) {}

  async resolve(req: SmartLinkRequest): Promise<SmartLinkResponse>{
    const path = this.getPath(req);

    const rules: Rule[] = await this.linkRepository.findOne(path);

    const rule = this.chooseRule(rules);

    return this.getResponse(rule);
  }

  abstract getPath(req: SmartLinkRequest);

  abstract chooseRule(rules: Rule[]): Rule;
  
  abstract getResponse(rule: Rule): Promise<SmartLinkResponse>;

}