const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: {
    traceroute: './js/Control.Traceroute.js',
  },
  output: {
    filename: 'leaflet-control-[name].js',
    path: path.resolve(__dirname, 'dist'),
    // library: 'leaflet-traceroute',
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
    contentBase: [__dirname, path.join(__dirname, 'dist')],
    contentBase: './',
    watchContentBase: true,
    https: true,
    open: true,
    openPage: ['demo.html']
    // openPage: ['webpack-dev-server/demo.html']
    // bonjour: true
  }
};
