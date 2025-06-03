import { Injectable } from "@nestjs/common";
import { Condition } from "./condition";

@Injectable()
export class CommandFactory {
  createCondition(
    input: Record<string, any>,
    condition: Record<string, any>,
    conditionKey: string
  ): Condition {
    return new Condition(input, condition, conditionKey);
  }  
}

