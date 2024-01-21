module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!@rneui/themed)/'],
  setupFiles: ['./jestSetup.js'],
};
