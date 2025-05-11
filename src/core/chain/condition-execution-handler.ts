import { Injectable } from "@nestjs/common";
import { IHandler } from "./ihandler";

import { LoggerService } from '../../logger/logger.service';

export const methods = {
  _handleCondition: null
};

@Injectable()
export class ConditionExecutionHandler implements IHandler{
  constructor(
    private readonly loggerService: LoggerService
  ) {
    if (process.env.NODE_ENV === 'test') {
      methods._handleCondition = this.handleCondition;
    }
  }

  private randomDecision = (num: number): boolean => {
    const probability = Math.abs(num) / 100; // Пример: num = 30 → 30% шанс true
    return Math.random() < probability;
  };

  private handleCondition(condition: object): boolean {
    const result = this.randomDecision(80);
    return result;
  }

  public handle(conditions: any[]): boolean {
    if (conditions.length === 0) {
      return true;
    }
    const condition = conditions.shift();
    this.loggerService.log(`Обрабатываем условие ${JSON.stringify(condition)}`);
    // TODO: реализовать обработку условия
    // ...
    const result = this.handleCondition(condition);
    if (result) {
      return this.handle(conditions);
    } else {
      return false;
    }
  }
}