export class Condition {
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}

    public static getConditionName(){
      return 'CheckRequestTimestampBetween';
    }
    public getConditionResult(): boolean {
      const requestTimestamp = this.input['Date'];
      const before = this.condition['Before'];
      const after = this.condition['After'];

      return requestTimestamp > after && requestTimestamp < before;
    }
}
