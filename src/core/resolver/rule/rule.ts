import { v4 as uuidv4 } from 'uuid';
import { Chain } from "../../chain/chain";
import { ConditionDictionary } from "../../conditions/condition-dictionary";
import { Condition } from "./condition";
import { LoggerService } from '../../../logger/logger.service';
import { ConditionExecutionHandler } from '../../chain/condition-execution-handler';

// executable Rule
export class Rule {
  url: string;
  chain: Chain;
  id: string;
  conditionExecutionHandler: ConditionExecutionHandler;
  constructor(
    private readonly loggerService: LoggerService,
  ) { 
      this.id = uuidv4();
  }

  init(url: string,
    input: Record<string, any>,
  ) {
    this.url = url;
    this.conditionExecutionHandler = new ConditionExecutionHandler(this.loggerService);
    this.chain = new Chain(this.conditionExecutionHandler, this.loggerService);
  }

  getConditionChain() {
    return this.chain;
  }
}
