module.exports = {
  entry: './src/base/index.ts',
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.json'],
    alias: require('./webpack.alias.config'),
  },
};
