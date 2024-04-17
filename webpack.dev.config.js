const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: ['ts-loader']
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js']
  },
  // webpack-dev-server 配置
  devServer: {
    static: './dist',
    port: 8080,
    hot: true
  },
  // 插件
  devtool: 'inline-source-map', // 开发环境使用 'inline-source-map'
  plugins: [
    new htmlWebpackPlugin({
      template: './index.ejs'
    }),
    // HMR 热模块更新, 配合 devServer 使用
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin()
  ]
}