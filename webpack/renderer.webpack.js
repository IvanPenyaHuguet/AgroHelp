const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: require('./rules.webpack'),
  },
  plugins: [new NodePolyfillPlugin()],
}
