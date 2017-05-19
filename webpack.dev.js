const webpack = require('webpack');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const path = require('path');

module.exports = {
  entry: {
    dashboard: './client/dashboard.js'
  },
  output: {
    path: 'public/dist/',
    publicPath: '/assets/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
};
