const { MCEP, isDev } = require('./webpack.shared.plugins');

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
    test: /\.module\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MCEP.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: isDev,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isDev,
        },
      },
    ],
  },
  {
    test: /\.s(a|c)ss$/,
    exclude: /\.module.(s(a|c)ss)$/,
    use: [
      isDev ? 'style-loader' : MCEP.loader,
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isDev,
        },
      },
    ],
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
