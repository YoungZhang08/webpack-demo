const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.dev');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:16].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  optimization: {
    splitChunks: { // 抽离框架打包代码，使得业务代码打包量减小
      chunks: "all",
      minChunks: 1,
      minSize: 0,
      cacheGroups: { // 定义需要抽离的模块
        framework: {
          test: "framework", // 匹配入口模块字符串，将此模块从其他模块中把包含这个模块的抽离出来
          name: "framework", // 抽离后生成的名字，和入口文件模块名称相同，这样抽离出来的新生成的 framework 会覆盖被抽离的 framework 模块
          enforce: true
        },
        vendor: {
          priority: 10,
          test: /node_modules/,
          name: "vendor",
          enforce: true,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new UglifyJSPlugin()
    ]
  }
});