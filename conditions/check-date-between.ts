export class Condition {
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}

    public static getConditionName(){
      return 'CheckDateBetween';
    }
    public getConditionResult(): boolean {
      const requestTimestamp = this.input['Date'];
      console.log(`CheckDateBetween: requestTimestamp:${requestTimestamp}`);
      if(!requestTimestamp){
        return false;
      }
      const date = new Date(requestTimestamp);
      console.log(`CheckDateBetween: date:${date}`);
      if(!date){
        return false;
      }
      const before = new Date(this.condition['Before']);
      if(!before){
        return false;
      }
      const after = new Date(this.condition['After']);
      if(!after){
        return false;
      }

      return date > after && date < before;
    }
}
