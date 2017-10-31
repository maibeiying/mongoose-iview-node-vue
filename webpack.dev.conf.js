const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=__webpack_hmr'

module.exports = merge(baseWebpackConfig, {
  entry: {
    'front': [hotMiddlewareScript, './vue/front/entry/app.js'],
    'background': [hotMiddlewareScript, './vue/background/entry/app.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
