const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    ['@components']: path.resolve(__dirname, 'src/components'),
    ['@utils']: path.resolve(__dirname, 'src/utils'),
    ['@hooks']: path.resolve(__dirname, 'src/hooks'),
    ['@styles']: path.resolve(__dirname, 'src/styles'),
    ['@configs']: path.resolve(__dirname, 'src/configs'),
    ['@services']: path.resolve(__dirname, 'src/services'),
  })
);
