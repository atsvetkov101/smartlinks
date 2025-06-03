import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { PathRulesRepository } from '../../database/path-rules/path-rules.repositry';
import { Injectable } from '@nestjs/common';
import { ConditionDictionary } from '../conditions/condition-dictionary';
import { PathRulesEntity } from '../../database/path-rules/path-rules.entity';
import { RequestResolver } from './request-resolver';
import { Rule } from './rule/rule';
import { Condition } from './rule/condition';
import { RulesBuilder } from './rule/rules-builder';
import { LoggerService } from '../../logger/logger.service';
import { ResponseInfo } from './rule/response-info';

@Injectable()
export class RequestResolverImpl extends RequestResolver {

  constructor(private pathRulesRepository: PathRulesRepository,
    private readonly conditionDictionary: ConditionDictionary,
    private readonly loggerService: LoggerService
  ) {
    super();
  }

  getPath(req: SmartLinkRequest){
    return req.get('path');
  }

  override async findRules(path: string): Promise<PathRulesEntity>{
    const rules = this.pathRulesRepository.findRules(path);
    const rulesInfo:PathRulesEntity | null = await this.pathRulesRepository.findRules(path);
		if(!rulesInfo || !rulesInfo.rules){
			return Promise.resolve(null);
		}
    /*
		if(rulesInfo.rules.hasOwnProperty('rules') && rulesInfo.rules.rules.length === 0){
			return Promise.resolve(null);
		}
      */
    return Promise.resolve(rulesInfo);
  }

  async chooseRule(req: SmartLinkRequest, pathRules: PathRulesEntity): Promise<ResponseInfo>{

    // перевести правила rules в из PathRulesEntity в формат, удобный для обработки.
    // для каждого правила должно быть сформирована цепочка условий
    const builder = new RulesBuilder(
      req,
      this.conditionDictionary,
      this.loggerService
    );
    await builder.init();

    for(const rule of pathRules.rules){
      builder.append(rule, req);
    }

    const preparedRules = builder.build();

    // по очереди выполняем цепочки условий. ищем первую успешную цепочку
    const passedRule = preparedRules.find((rule) => {
      const passed = rule.getConditionChain().start(null);
      return passed ? true : false; 
    });
    
    return this.prepareResponseInfo(passedRule, req);
  }
  
  getResponse(rule: ResponseInfo): Promise<SmartLinkResponse>{
    // TODO: сформировать ответ
    const smartLinkResponse = new SmartLinkResponse();
    smartLinkResponse.url = rule.url;
    return Promise.resolve(smartLinkResponse);
  }

  private prepareResponseInfo(rule: Rule, req: SmartLinkRequest,): ResponseInfo{
    const responseInfo = new ResponseInfo();
    if(rule) {
      this.loggerService.log(`Соответствие всех условий для правила найдено: ${JSON.stringify(rule)}:`);
      responseInfo.url = rule.url;
    } else {
      this.loggerService.log(`Соответствий не найдено для запроса ${JSON.stringify(req)}`);
      responseInfo.ruleNotFound = true;
    }
    return responseInfo;
  }
}
