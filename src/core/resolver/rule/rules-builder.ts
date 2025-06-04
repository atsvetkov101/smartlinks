import { Inject } from "@nestjs/common";
import { Injectable, Scope } from '@nestjs/common';
import { PathRulesEntity } from "../../../database/path-rules/path-rules.entity";
import { SmartLinkRequest } from "../../common/smart-link-request";
import { ConditionDictionary } from "../../conditions/condition-dictionary";
import { Rule } from "./rule";
import { ConditionExecutionHandler } from "../../chain/condition-execution-handler";
import { LoggerService } from "../../../logger/logger.service";
import { Chain } from "../../chain/chain";
import { CustomHttpException } from "../../exceptions/custom-http-exception";

type FuncConstructor = (...args: any[]) => void;

export class RulesBuilder{
  private rules: Rule[] = [];
  constructor(
      private readonly smartLinkRequest: SmartLinkRequest,
      private readonly conditionDictionary: ConditionDictionary,
      private readonly loggerService: LoggerService
    ){
  }

  async init(){
    await this.conditionDictionary.init();
  }

  append(ruleEntity: object, input: SmartLinkRequest): RulesBuilder{
    try{
      const conditionExecutionHandler = new ConditionExecutionHandler(this.loggerService);

      const rule = new Rule(this.loggerService);
      rule.init(ruleEntity['url'], input['data']);
      const chain:Chain = rule.getConditionChain();

      if(!ruleEntity.hasOwnProperty('conditions')){
        throw new Error('Rule must have conditions');
      }
      this.fillTheChain(ruleEntity, input, chain);
    
      this.rules.push(rule);  
    } catch(error: any){
      this.loggerService.error(`RulesBuilder.append(...): Ошибка '${error.message}' ${error?.stack}`);
    }
    return this;
  }

  private fillTheChain(ruleEntity: object, input: SmartLinkRequest, chain: Chain) {
    let conditionId;
    for (const condition of ruleEntity['conditions']) {
      try {
      conditionId = condition['id'];
      const ClsCondition = this.conditionDictionary.getCondition(conditionId) as FuncConstructor;

      const instanceCondition = new ClsCondition(input['data']['data'], condition);
      chain.pushCondition(instanceCondition);
      } catch(error: any){
        throw new Error(`conditionId='${conditionId || ''}' Ошибка '${error.message}' ${error?.stack}`);
      }
    }
  }

  build(){
    return this.rules;
  }
}