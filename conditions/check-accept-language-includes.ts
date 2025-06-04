export class Condition {
    //Пример: "accept-language":"ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7"
    constructor(
      public readonly input: Record<string, any>, 
      public readonly condition: Record<string, any>) {}
    
    public static getConditionName(){
      return 'AcceptLanguageIncludes';
    }
    public getConditionResult() {
      const acceptLanguage: string = this.input['accept-language'];
      if(!acceptLanguage){
        return false;
      }
      const includes = this.condition['Includes'];
      if(!includes){
        return false;
      }
      return acceptLanguage.toLowerCase().includes(includes.toLowerCase());
    }
}
