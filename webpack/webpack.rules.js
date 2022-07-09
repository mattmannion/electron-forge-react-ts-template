module.exports = [
  {
    test: /native_modules\/.+\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.ts?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.s[ac]ss$/i,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
  {
    test: /\.js$/,
    use: 'webpack-import-glob-loader',
  },
  {
    test: /\.jsx$/,
    use: 'webpack-import-glob-loader',
  },
  {
    test: /\.ts$/,
    use: 'webpack-import-glob-loader',
  },
  {
    test: /\.tsx$/,
    use: 'webpack-import-glob-loader',
  },
];
