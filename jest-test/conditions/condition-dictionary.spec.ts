
import path from 'node:path';
import sinon from 'sinon';
import { ConditionDictionary } from '../../src/core/conditions/condition-dictionary';

type FuncConstructor = (...args: any[]) => void;

describe('condition-dictionary tests', () => {
  describe('condition-dictionary tests', () => {
    beforeAll(() => {
    });
    afterAll(() => {
    });
    it('condition-dictionary load and compile test', async () => {
      
      process.env.CONDITIONS_DIRECTORY = 'test-conditions';

      const conditionFullPath = path.join(__dirname, process.env.CONDITIONS_DIRECTORY);
      console.log(`Директория для условий: ${conditionFullPath}`);
      const conditionDictionary = new ConditionDictionary();
      conditionDictionary.setConditionDirectory(conditionFullPath)

      await conditionDictionary.init();
      conditionDictionary.compileConditions();

      const keys = conditionDictionary.getConditionKeys();
      console.log(`Ключи условий: ${keys}`);
      
      expect(keys).toContain('CheckDateBefore');
      expect(keys).toContain('CheckRequestTimestampBetween');
      expect(keys.length).toBe(2);
    });

    it('condition-dictionary usage', async () => {
      
      process.env.CONDITIONS_DIRECTORY = 'test-conditions';

      const conditionFullPath = path.join(__dirname, process.env.CONDITIONS_DIRECTORY);
      console.log(`Директория для условий: ${conditionFullPath}`);
      const conditionDictionary = new ConditionDictionary();
      conditionDictionary.setConditionDirectory(conditionFullPath)

      await conditionDictionary.init();
      conditionDictionary.compileConditions();

      const keys = conditionDictionary.getConditionKeys();
      console.log(`Ключи условий: ${keys}`);
      
      const input = {
        Date: new Date('2025-01-02 15:00:00')
      };

      const condition = {
        After: new Date('2025-01-01'),
        Before: new Date('2025-01-03')
      }

      const ClsCondition = conditionDictionary.getCondition('CheckRequestTimestampBetween') as FuncConstructor;
      
      const instanceCheckRequestTimestampBetween = new ClsCondition(input, condition);
      const res = instanceCheckRequestTimestampBetween.getConditionResult();
      expect(res).toBe(true);

    });
  });
});
