const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const { MCEP, isDev } = require('./webpack.shared.plugins');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new MCEP({
    filename: isDev ? '[name].css' : '[name].[chunkhash].css',
    chunkFilename: isDev ? '[id].css' : '[id].[chunkhash].css',
  }),
  new webpack.DefinePlugin({
    __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
  }),
];
