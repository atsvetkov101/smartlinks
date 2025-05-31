import { Injectable } from "@nestjs/common";
import { ConditionExecutionHandler } from "./condition-execution-handler";
import { LoggerService } from "../../logger/logger.service";
import { ICondition } from "../interfaces/icondition";
import { BaseConditionExecutionHandler } from "./base-condition-execution-handler";

@Injectable()
export class Chain {
  constructor(
    private readonly conditionExecutionHandler: BaseConditionExecutionHandler,
    private readonly loggerService: LoggerService,
  ) {}

  start(conditions: ICondition[]): boolean {
    return this.conditionExecutionHandler.handle(conditions);
  }
}
