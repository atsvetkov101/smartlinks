export class Condition {
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}

    public static getConditionName(){
      return 'CheckDateBetween';
    }
    public getConditionResult() {
      const requestTimestamp = this.input['Date'];
      if(!requestTimestamp){
        return false;
      }
      const before = this.condition['Before'];
      if(!before){
        return false;
      }
      const after = this.condition['After'];
      if(!after){
        return false;
      }

      return requestTimestamp > after && requestTimestamp < before;
    }
}
