import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Path to your Next.js app
  dir: './', 
});

const customJestConfig = {
  // Add more setup options before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Handle module aliases (must match tsconfig paths)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@nearx/api-client$': '<rootDir>/../../packages/api-client/src',
  },
  
  // Test environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Coverage settings
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/*.d.ts',
    '!**/.next/**',
  ],
  
  // Transform settings
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/out/',
    '/public/',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
