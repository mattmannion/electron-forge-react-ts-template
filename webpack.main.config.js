module.exports = {
  /**
   * This is the main entry point for your appljkication, it's the first file
   * that runs in the main process.
   */
  entry: './src/webpack/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.json'],
    alias: require('./webpack.alias.config'),
  },
};
