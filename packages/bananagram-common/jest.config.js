module.exports = {
  projects: [
    {
      preset: 'ts-jest',
      testEnvironment: 'node',
      displayName: 'bananna-common-test',
    },
    {
      preset: 'ts-jest',
      testEnvironment: 'node',
      displayName: 'banana-common-lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**/*.ts'],
    },
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
};
