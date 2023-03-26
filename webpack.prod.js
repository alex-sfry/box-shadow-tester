const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  entry: {
    main: path.resolve(__dirname, './src/main.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './index.html'), // template file
      filename: 'index.html', // output file
    }),
	new CleanWebpackPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new MiniCssExtractPlugin()
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
		{
		 test: /\.(scss|css)$/,
		 use: [
			MiniCssExtractPlugin.loader,
			'css-loader',
			'sass-loader'
		 ],
		},
      // JavaScript
      {
       test: /\.js$/,
       exclude: /node_modules/,
       use: ['babel-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  }
};