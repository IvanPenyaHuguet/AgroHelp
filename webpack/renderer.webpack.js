const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  target: 'electron-renderer',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: require('./rules.webpack'),
  },
  plugins: [new NodePolyfillPlugin()],
}
