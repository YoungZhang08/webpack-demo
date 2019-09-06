module.exports = {
  entry: {
    src: './src/index.js', // 打包入口
    framework: ['react','react-dom'], // 框架分开打包
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        exclude: /node_modules/
      }
    ]
  }
}