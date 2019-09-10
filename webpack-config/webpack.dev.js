const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config = require('./webpack.common');

config
  .mode('development')
  .devtool('cheap-module-eval-source-map');

config
  .devServer
    .compress(true) // 压缩
    .host('localhost') // 默认为 localhost
    .port('8080') // 默认端口为 8080
    .hot(true) // 热加载
    .progress(true)

/** 热更新 */
config
  .plugin('hot')
    .use(webpack.HotModuleReplacementPlugin)

/** 输出控制台信息 */
config
  .plugin('friend')
    .use(FriendlyErrorsWebpackPlugin, [{
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [
          `Project is running at http://localhost:8080`
        ],
        notes: ['notice:']
      },
      onErrors: function(severity, errors) {
        console.log(severity, errors)
      }
    }])

module.exports = config.toConfig();