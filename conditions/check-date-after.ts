export class Condition {
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}
    
    public static getConditionName(){
      return 'CheckDateAfter';
    }
    public getConditionResult() {
      const requestTimestamp = this.input['Date'];
      if(!requestTimestamp){
        return false;
      }
      const after = this.condition['After'];
      if(!after){
        return false;
      }
      return requestTimestamp > after;
    }
}
