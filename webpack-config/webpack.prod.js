const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

const config = require('./webpack.common');
const smp = new SpeedMeasurePlugin({
  outputFormat: 'humanVerbose',
});

config
  .mode("production")
  .devtool("source-map")

config
  .plugin('terser')
    .use(TerserJSPlugin, [{
      cache: true,
      parallel: true
    }]);

config
  .plugin('minicss')
    .use(MiniCssExtractPlugin, [{
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }])

config
  .plugin('optimize')
    .use(OptimizeCssAssetsPlugin)

/** 文件hash */
config
  .plugin('hash')
    .use(webpack.HashedModuleIdsPlugin, [{
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 4
    }])
    
module.exports = smp.wrap(config.toConfig());

