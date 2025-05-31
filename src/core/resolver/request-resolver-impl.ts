import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { PathRulesRepository } from '../../database/path-rules/path-rules.repositry';
import { Injectable } from '@nestjs/common';
import { ConditionDictionary } from '../conditions/condition-dictionary';
import { PathRulesEntity } from '../../database/path-rules/path-rules.entity';
import { RequestResolver } from './request-resolver';

@Injectable()
export class RequestResolverImpl extends RequestResolver {

  constructor(private pathRulesRepository: PathRulesRepository,
    conditionDictionary: ConditionDictionary
  ) {
    super();
  }

  getPath(req: SmartLinkRequest){
    return req.get('path');
  }
// TODO : PathRulesEntityany
  override async findRules(path: string): Promise<[PathRulesEntity]>{
    const rules = this.pathRulesRepository.findRules(path);
    const rulesInfo:PathRulesEntity | null = await this.pathRulesRepository.findRules(path);
		if(!rulesInfo || !rulesInfo.rules){
			return Promise.resolve(null);
		}
		if(rulesInfo.rules.length === 0){
			return Promise.resolve(null);
		}
    // TODO: перевести правила rules в из PathRulesEntity в формат, удобный для обработки
    return Promise.resolve([new PathRulesEntity({
      path: '',
	    rules: ''
    })]);
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
