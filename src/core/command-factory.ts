import { Injectable } from '@nestjs/common';
import { RuleCommand } from './rule-command';
import { ICommandFactory } from './interfaces/icommand-factory';

@Injectable()
export class CommandFactory  implements ICommandFactory {
  createRuleCommand(data: object): RuleCommand {
    return new RuleCommand(data);
  }
}