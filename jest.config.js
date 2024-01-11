process.env.TZ = 'UTC';

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  globals: {
    MODULE_BILLING_ACTIVE: true,
    MODULE_USER_MANAGEMENT_ACTIVE: true,
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    'constants',
    'assets/icons',
    'tests',
    'fixtures',
    'slices',
    'models',
    'src/pages',
    'src/index.ts',
    'src/bootstrap.tsx',
    'd.ts',
    'src/AppWithStore.tsx',
    '.example',
    'i18n',
    'Styles.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!react-dnd|dnd-core|@react-dnd|@mui/material)/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/__mocks__/fileMock.ts',
    'react-i18next': '<rootDir>/src/tests/__mocks__/i18nextReactMocks.tsx',
    i18next: '<rootDir>/src/tests/__mocks__/i18nextMocks.ts',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@validators*(.*)$': '<rootDir>/src/validators$1',
    '^@utils*(.*)$': '<rootDir>/src/utils$1',
    '^@store*(.*)$': '<rootDir>/src/store$1',
    '^@sagas*(.*)$': '<rootDir>/src/sagas$1',
    '^@pages*(.*)$': '<rootDir>/src/pages$1',
    '^@translations*(.*)$': '<rootDir>/src/i18n$1',
    '^@services*(.*)$': '<rootDir>/src/services',
    '^@containers*(.*)$': '<rootDir>/src/containers$1',
    '^@hooks*(.*)$': '<rootDir>/src/hooks$1',
    '^@assets*(.*)$': '<rootDir>/src/assets$1',
    '^@guards*(.*)$': '<rootDir>/src/guards$1',
    '^@src*(.*)$': '<rootDir>/src$1',
    '^@constants*(.*)$': '<rootDir>/src/constants$1',
    '^@types*(.*)$': '<rootDir>/src/types$1',
    '^@enums*(.*)$': '<rootDir>/src/enums$1',
  },
  setupFiles: ['fake-indexeddb/auto', '<rootDir>/src/tests/dotenv-config.js'],
  testTimeout: 20000,
};
