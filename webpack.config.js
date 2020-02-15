const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: {
    course: './js/Control.Course.js',
  },
  output: {
    filename: 'leaflet-[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  externals: {
    leaflet: 'L',
  },
  plugins: [
    new webpack.ProvidePlugin({ L: 'leaflet', 'window.L': 'leaflet', }),
],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devServer: {
    contentBase: 'dist/',
    watchContentBase: true,
    https: true,
    open: true,
    openPage: ['test.html'],
    inline: true,
    hot: true
  }
};
