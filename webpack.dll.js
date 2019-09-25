const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const bundleConfig = require("./bundle-config.json")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

// dll文件存放的目录
const dllPath = 'public/dll'
module.exports = {
  entry: {
    react: ['react','react-dom','react-redux','antd','n-zepto','echarts']//需要公用的第三方库
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      name: '[name]'
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true,
      // 加载dll文件
      vendorJsName: bundleConfig.react.js
    }),
     // 生成gzip
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}