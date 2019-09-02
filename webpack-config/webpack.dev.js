const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 
const webpack = require('webpack'); // 用于访问内置插件
const devMode = process.env.NODE_ENV !== 'production'; // 开发模式
console.log(devMode);

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      { 
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js?|tsx?|jsx?)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    })
  ]
};