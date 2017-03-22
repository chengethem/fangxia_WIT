const webpack = require('webpack');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const path = require('path');

module.exports = {
  entry: {
    client: './client/site.js'
  },
  output: {
    path: 'public/dist/',
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve('./'),
    modulesDirectories: ['node_modules']
  },
  plugins: [commonsPlugin],
  devtool: 'source-map'
};
