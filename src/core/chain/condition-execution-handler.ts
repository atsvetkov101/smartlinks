import { Injectable } from "@nestjs/common";
import { IHandler } from "./ihandler";

import { LoggerService } from '../../logger/logger.service';
import { BaseConditionExecutionHandler } from "./base-condition-execution-handler";
import { ICondition } from "../interfaces/icondition";

@Injectable()
export class ConditionExecutionHandler extends BaseConditionExecutionHandler implements IHandler{
  constructor(
    private readonly loggerService: LoggerService
  ) {
    super();
  }

  private handleCondition(condition: ICondition): boolean {
    const result = condition.getConditionResult();
    return result;
  }

  public handle(conditions: ICondition[]): boolean {
    if (conditions.length === 0) {
      return true;
    }
    const condition = conditions.shift();
    this.loggerService.log(`Обрабатываем условие ${JSON.stringify(condition)}`);
    const result = this.handleCondition(condition);
    
    this.loggerService.log(`${result===true ? 'Соответствие условию найдено: ': ''}Результат:${result} Обрабатываем условие ${JSON.stringify(condition)}`);
    if (result) {
      return this.handle(conditions);
    } else {
      return false;
    }
  }
}