const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  target: 'electron-main',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  },
  plugins: [new NodePolyfillPlugin()],
}
