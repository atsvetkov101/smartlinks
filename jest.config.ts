import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/jest-test/**/*.spec.ts', '<rootDir>/src/core/**/*.spec.ts'],
  coverageDirectory: '<rootDir>/jest-coverage',
  collectCoverageFrom: ['src/core/**/*.ts','!src/core/**/*.spec.ts',],
  testTimeout: 60000
};

export default config;
