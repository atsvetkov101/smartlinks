import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { PathRulesRepository } from '../../database/path-rules/path-rules.repositry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestResolverImpl {

  constructor(private pathRulesRepository: PathRulesRepository) {}

  getPath(req: SmartLinkRequest){
    return req.get('path');
  }

  findRules(path: string): Rule[]{
    const rules = this.pathRulesRepository.findRules(path);
    // TODO: перевести правила rules в из PathRulesEntity в формат, удобный для обработки
    return [new Rule()];
  }

  chooseRule(rules: Rule[]): Rule{
    // TODO: выбрать Rule из списка
    return rules[0];
  }
  
  getResponse(rule: Rule): Promise<SmartLinkResponse>{
    // TODO: сформировать ответ
    return Promise.resolve(new SmartLinkResponse());
  }
}
