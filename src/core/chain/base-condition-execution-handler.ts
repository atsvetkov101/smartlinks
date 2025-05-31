import { Injectable } from "@nestjs/common";
import { IHandler } from "./ihandler";
import { ICondition } from "../interfaces/icondition";

@Injectable()
export abstract class BaseConditionExecutionHandler implements IHandler{

  abstract handle(conditions: ICondition[]): boolean 
}