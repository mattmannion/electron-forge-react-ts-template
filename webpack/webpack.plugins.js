const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { MCEP, isDev } = require('./webpack.shared.plugins');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new MCEP({
    filename: isDev ? '[name].css' : '[name].[hash].css',
    chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
  }),
];
