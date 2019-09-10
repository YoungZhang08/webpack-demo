const Config = require('webpack-chain'); // 导入 webpack-chain 模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = new Config();
const devMode = "production" !== process.env.NODE_ENV; // 模式（开发 ？ 运行）

config
  // 修改 entry 配置
  .entry('index')
    .add('./src/index.tsx')
    .end()
  .output
    .path('./dist')
    .filename('[name].[chunkhash].js')

/** js */
config.module
  .rule('js')
    .test(/\.(jsx?|tsx?)$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('happypack')
      .loader('babel-loader')

/** css */
config.module
  .rule('css')
    .test(/\.(c|le)ss$/)
    .use('style')
      .loader(devMode ? 'style-loader' : MiniCssExtractPlugin.loader)
      .end()
    .use('css')
      .loader('css-loader')
      .end()
    .use('less')
      .loader('less-loader')

/** plugin */
config
  .plugin('html')
    .use(HtmlWebpackPlugin, [{
      cache: true,
      favicon: '',
      title: 'Pet Admin',
      template: './public/index.html',
      filename: './index.html',
      inject: true,
      hash: true,
      meta: '',
      minify: { collapseWhitespace: true },
      showErrors: true,
      xhtml: true,
    }])

/** 用于描述的 JSON 文件 */
config.resolve
  .descriptionFiles
    .add('package.json')

/** 自动解析确定的扩展 */
config.resolve.extensions
  .add('.js')
  .add('.jsx')
  .add('.ts')
  .add('.tsx')
  .add('.json')

config.resolve.mainFields
  .add('jsnext:main')
  .add('browser')
  .add('main')

/** 解析目录时要使用的文件名。 */
config.resolve.mainFiles
  .add('index')

config.resolve.modules
  .add('node_modules')

module.exports = config;