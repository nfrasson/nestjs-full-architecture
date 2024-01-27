export default {
  verbose: true,
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/main.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/db/prisma/prisma.service.ts',
    '!<rootDir>/src/**/*.{interface,dto,module,schema}.ts',
  ],
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 63,
      functions: 100,
      statements: 100,
    },
  },
};
