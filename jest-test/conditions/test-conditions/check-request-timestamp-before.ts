export class Condition {
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}
    
    public static getConditionName(){
      return 'CheckDateBefore';
    }
    public getConditionResult(): boolean {
      const requestTimestamp = this.input['Date'];
      const before = this.condition['Before'];
      return requestTimestamp < before;
    }
}
