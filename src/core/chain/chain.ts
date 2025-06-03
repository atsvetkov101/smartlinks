import { Injectable } from "@nestjs/common";
import { ConditionExecutionHandler } from "./condition-execution-handler";
import { LoggerService } from "../../logger/logger.service";
import { ICondition } from "../interfaces/icondition";
import { BaseConditionExecutionHandler } from "./base-condition-execution-handler";


export class Chain {
  conditions: ICondition[] = [];
  constructor(
    private readonly conditionExecutionHandler: BaseConditionExecutionHandler,
    private readonly loggerService: LoggerService,
  ) {}

  pushCondition(condition: ICondition): void {
    this.conditions.push(condition);
  }

  /**
   * Запускааем цепочку условий
   * @param conditions - цепочка условий. Если null, то используется внутренняя цепочка для обработки
   * @returns boolean - результат обработки цепочки условий
   */
  start(conditions: ICondition[] | null): boolean {
    const conditionsToHandle = conditions ? conditions : this.conditions;
    // Если условий нет, то считаем, что все условия пройдены. возвращаем true
    if(conditionsToHandle.length === 0){
      return true;
    } 
    this.loggerService.log(`Starting chain with ${conditionsToHandle.length} conditions`)
    return this.conditionExecutionHandler.handle(conditionsToHandle);
  }
}
