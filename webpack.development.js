const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: './client/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new LiveReloadPlugin()
  ],
  devtool: 'source-map'
}
