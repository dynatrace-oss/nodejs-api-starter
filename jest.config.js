module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@bff/(.*)': '<rootDir>/src/$1',
    '@mock/(.*)': '<rootDir>/test/__mocks__/$1',
  },
  testMatch: ['<rootDir>/src/**/?(*.)+(test|spec).ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/**/__*__/*',
    '!<rootDir>/src/**/server.ts',
    '!<rootDir>/src/**/inversify.config.ts',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['src', 'test', 'node_modules'],
};
