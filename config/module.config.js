const { dependencies } = require('../package.json');

const moduleConfig = {
  name: 'Host',
  filename: process.env.HOST_MODULE_BUNDLE_NAME,
  remotes: {},
  exposes: {
    './App': './src/App',
    './AppWithStore': './src/AppWithStore',
    './translations': './src/i18n/config',
    './styles': './src/styles',
    './utils': './src/utils',
    './constants': './src/constants',
    './components': './src/components',
    './containers': './src/containers',
    './services': './src/services',
    './guards': './src/guards',
    './hooks': './src/hooks',
    './store': './src/store',
    './validators': './src/validators',
    './enums': './src/enums',
    './types': './src/types',
    './tests': './src/tests',
    './regexp': './src/regexp',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    msw: {
      singleton: true,
      requiredVersion: dependencies['msw'],
    },
    i18next: {
      singleton: true,
      requiredVersion: dependencies['i18next'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: dependencies['react-router-dom'],
    },
    'react-redux': {
      singleton: true,
      requiredVersion: dependencies['react-redux'],
    },
    'react-i18next': {
      singleton: true,
      requiredVersion: dependencies['react-i18next'],
    },
    '@material-ui/core': {
      singleton: true,
      requiredVersion: dependencies['@material-ui/core'],
    },
    '@mui/private-theming': { singleton: true, requiredVersion: dependencies['@mui/material'] },
    '@mui/styles': { singleton: true, requiredVersion: dependencies['@mui/material'] },
  },
};


module.exports = moduleConfig;
