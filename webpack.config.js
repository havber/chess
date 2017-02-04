var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'assets',
    filename: 'bundle.js',
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      {
        test: /.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /.scss?$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader'
      }
    ]
  },
  devServer: {
    inline: true,
  }
};
