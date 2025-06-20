export class Condition {
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}
    
    public static getConditionName(){
      return 'CheckUserAgentIncludes';
    }
    public getConditionResult() {
      const userAgent: string = this.input['user-agent'];
      if(!userAgent){
        return false;
      }
      const includes = this.condition['Includes'];
      if(!includes){
        return false;
      }
      return userAgent.toLowerCase().includes(includes.toLowerCase());
    }
}
