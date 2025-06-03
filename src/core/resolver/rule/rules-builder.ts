import { Inject } from "@nestjs/common";
import { Injectable, Scope } from '@nestjs/common';
import { PathRulesEntity } from "../../../database/path-rules/path-rules.entity";
import { SmartLinkRequest } from "../../common/smart-link-request";
import { ConditionDictionary } from "../../conditions/condition-dictionary";
import { Rule } from "./rule";
import { ConditionExecutionHandler } from "../../chain/condition-execution-handler";
import { LoggerService } from "../../../logger/logger.service";
import { Chain } from "../../chain/chain";

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

    const conditionExecutionHandler = new ConditionExecutionHandler(this.loggerService);

    const rule = new Rule(this.loggerService);
    rule.init(ruleEntity['url'], input['data']);
    const chain:Chain = rule.getConditionChain();

    if(!ruleEntity.hasOwnProperty('conditions')){
      throw new Error('Rule must have conditions');
    }
    for(const condition of ruleEntity['conditions']){
      const conditionId = condition['id'];
      const ClsCondition = this.conditionDictionary.getCondition(conditionId) as FuncConstructor;
      
      const instanceCondition = new ClsCondition(input['data'], condition);
      chain.pushCondition(instanceCondition);
    }
   
    this.rules.push(rule);  
  
    return this;
  }

  build(){
    return this.rules;
  }
}