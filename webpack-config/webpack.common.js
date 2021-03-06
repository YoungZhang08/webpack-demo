const Config = require('webpack-chain'); // 导入 webpack-chain 模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 构建前删除原有的打包文件
const path = require('path');

const config = new Config(); // 实例化一个 webpack-chain
const devMode = "production" !== process.env.NODE_ENV; // 模式（开发 == true，生产 == false）

config
  // 配置 entry
  .entry('index')
    .add('./src/index.tsx') // 入口路径
    .end()
  .output
    .path(path.resolve(__dirname, '../dist'))
    .filename('[name].[hash].js') // 使用 hash 方式防止打包后的文件名重名

/** js */
config.module
  .rule('js')
    .test(/\.(jsx?|tsx?)$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('happypack')
      .loader('babel-loader')
      .end()

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
      .end()

/** 图片 */
config.module
  .rule('image')
    .test(/\.(png|jpg|gif|svg|webp)/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('url')
      .loader('url-loader')
      .options({
        limit: 8192
      })
      
/** plugin */
// config
//   .plugin('clean')
//     .use(CleanWebpackPlugin, [path.resolve(__dirname, '../dist')])

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