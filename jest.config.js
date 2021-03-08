module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['./src/setup.ts'],
  testMatch: ['**/src/**/?(*.)+(spec|test).[jt]s'],
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    'vee-validate/dist/rules': 'babel-jest',
    'vee-validate/dist/components': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!vee-validate/dist/rules)'],
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!**/node_modules/**',
    '!src/App.vue',
    '!src/**/index.{js,ts}',
    '!src/**/main.ts',
    '!src/**/router.{js,ts}',
    '!src/**/store.ts',
    '!src/store/plugins/**',
    '!src/store/**/*Api.{js,ts}',
    '!src/store/**/state.{js,ts}',
    '!src/plugins/**',
  ],
};
