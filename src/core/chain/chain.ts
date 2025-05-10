import { Injectable } from "@nestjs/common";
import { ConditionExecutionHandler } from "./condition-execution-handler";
import { LoggerService } from "../../logger/logger.service";

@Injectable()
export class Chain {
  constructor(
    private readonly conditionExecutionHandler: ConditionExecutionHandler,
    private readonly loggerService: LoggerService,
  ) {}

  start(conditions: any[]): boolean {
    return new ConditionExecutionHandler(this.loggerService).handle(conditions);
  }
}
