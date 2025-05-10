import { ICommand } from "./icommand";

export interface ICommandFactory{
  createRuleCommand(data: any): ICommand;
}
