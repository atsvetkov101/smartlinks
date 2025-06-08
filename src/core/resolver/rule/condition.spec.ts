import { Condition } from './condition';


describe('Condition', () => {
  it('should create an instance with empty input and condition objects, and set conditionKey', () => {
    const input = { test: 'value' };
    const condition = { key: 'example' };
    const conditionKey = 'testKey';

    const conditionInstance = new Condition(input, condition, conditionKey);

    expect(conditionInstance).toBeInstanceOf(Condition);
    expect(conditionInstance.input).toEqual({});
    expect(conditionInstance.condition).toEqual({});
    expect(conditionInstance.conditionKey).toBe(conditionKey);
  });
});
