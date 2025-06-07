import { TsCompiler } from './index';
interface CompilerResult {
  ModuleKind: object;
  ScriptTarget: object;
}

describe('TsCompiler', () => {
  describe('compileCode', () => {
    it('should transpile TypeScript code to ES2022 with CommonJS module', () => {
      const sourceCode = `const greet = (): string => 'Hello, World!';`;
      const expectedOutput = `const greet = () => 'Hello, World!';`;
      expect(TsCompiler.compileCode(sourceCode).replace(/[\r\n]/g, '')).toBe(expectedOutput);
    });

    it('should handle TypeScript with ES2022 features correctly', () => {
      const sourceCode = "const promise = Promise.resolve('Done');";
      const expectedOutput = "const promise = Promise.resolve('Done');";
      expect(TsCompiler.compileCode(sourceCode).replace(/[\r\n]/g, '')).toBe(expectedOutput);
    });
  });

  describe('runCode', () => {
    it('should execute code and return exports', () => {
      const code = `module.exports = { message: 'Hello, World!' };`;
      expect(TsCompiler.runCode(code)).toEqual({ message: 'Hello, World!' });
    });

    it('should correctly handle code using the "typescript" module', () => {
      const code = `module.exports = ts;`;
      // Since eval runs in the same context, we check for a property fromtypescript module
      const result = TsCompiler.runCode(code) as CompilerResult;
      
      expect(result.ModuleKind).toBeDefined();
      expect(result.ScriptTarget).toBeDefined();
      
    });

    it('should throw an error when attempting to require an unknown module', () => {
      const code = `require('unknown-module');`;
      expect(() => TsCompiler.runCode(code)).toThrowError('Module unknown-module not found');
    });
  });
});
