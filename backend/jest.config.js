module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './src',
  testRegex: '.*\.spec\.ts$',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};
