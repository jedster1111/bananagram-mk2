module.exports = {
  projects: [
    {
      preset: 'ts-jest',
      testEnvironment: 'node',
      displayName: 'test',
    },
    {
      preset: 'ts-jest',
      testEnvironment: 'node',
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**/*.ts'],
    },
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
};
