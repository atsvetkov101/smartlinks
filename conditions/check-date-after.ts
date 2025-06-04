export class Condition {
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}
    
    public static getConditionName(){
      return 'CheckDateAfter';
    }
    public getConditionResult() {
      const date = this.input['date'];
      console.log(`CheckDateAfter: date:${date}`);
      if(!date){
        return false;
      }
      const dtDate = new Date(date);
      console.log(`CheckDateAfter: dtDate:${dtDate}`);
      const after = this.condition['After'];
      console.log(`CheckDateAfter: after:${after}`);
      if(!after){
        return false;
      }
      const dtAfter = new Date(after);
      console.log(`CheckDateAfter: dtAfter:${dtAfter}`);
      return dtDate > dtAfter;
    }
}
