type FuncConstructor = (...args: any[]) => void;

export class Condition {

  input: Record<string, any>;
  condition: Record<string, any>;
  conditionKey: string;
  predicateExecutor: object;
  cls: FuncConstructor;
  constructor(
    input: Record<string, any>,
    condition: Record<string, any>,
    conditionKey: string) 
  {
    this.input = {};
    this.condition = {};
    this.conditionKey = conditionKey;
  }
}