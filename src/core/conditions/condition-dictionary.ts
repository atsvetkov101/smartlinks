import { Injectable } from '@nestjs/common';
import { TsCompiler } from '../compiler';
import getFiles from './loader';


/**
 * Класс "Словарь условий" содержит классы условий
 */
@Injectable()
export class ConditionDictionary{
  private rawConditions: Record<string, string>;
  private executableConditions: Record<string, object>;
  private conditionDirectory: string = 'conditions';
  constructor(){
    
  }

  setConditionDirectory(dir: string){
    this.conditionDirectory = dir;
  }
  
  async init(){
    try{
      this.rawConditions = await getFiles(this.conditionDirectory);
    }catch(e){
      console.log(e);
    }
  }

  compileConditions(){
    const conditionsCode = this.rawConditions;
    this.executableConditions = {};
    for (let cond in conditionsCode) {
      if (conditionsCode.hasOwnProperty(cond)) {
        const code = conditionsCode[cond];
        const compiledCondition = TsCompiler.compileCode(code);
        const objectCondition = TsCompiler.runCode(compiledCondition);
        const cls = objectCondition['Condition'];
        const conditionName = cls.getConditionName();
        this.executableConditions[conditionName] = cls;
      }
    }
  }
  
  getConditionKeys(){
    return Object.keys(this.executableConditions);
  }

  getCondition(key: string){
    return this.executableConditions[key];
  }
}

