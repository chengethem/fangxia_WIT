const webpack = require('webpack');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const pathsToClean = path.join(__dirname, './public/dist');

module.exports = {
  entry: {
    dashboard: './client/dashboard.js'
  },
  output: {
    path: path.resolve('./', 'public/dist/'),
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
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(), //minify everything
  ],
  resolve: {
    modules: [path.resolve('./'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
};
