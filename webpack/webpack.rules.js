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
    test: /\.(ts|tsx)?$/,
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
          module: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          module: true,
        },
      },
    ],
  },
  {
    test: /\.s[ac]ss$/i,
    exclude: /\.module\.s[ac]ss$/i,
    use: [isDev ? 'style-loader' : MCEP.loader, 'css-loader', 'sass-loader'],
  },
  {
    test: /\.(js|jsx|ts|tsx)$/,
    use: 'webpack-import-glob-loader',
  },
];
