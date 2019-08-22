const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateJsonWebpackPlugin = require('generate-json-webpack-plugin');

// const PackageJsonPlugin = require('./webpack-plugins/package-json');

const packageJson = require('./package.json');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: {
    'main/main': './src/main/main.js',
    'editor/index': './src/editor/index.js',
    'preview/index': './src/preview/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    // publicPath: '',
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'editor/index.html',
      chunks: ['editor/index'],
      template: 'src/editor.hbs',
      description: 'editor window',
    }),
    new HtmlWebpackPlugin({
      filename: 'preview/index.html',
      chunks: ['preview/index'],
      template: 'src/preview.hbs',
      description: 'preview window',
    }),
    new GenerateJsonWebpackPlugin('package.json', {
      name: 'add-a-chapter',
      author: 'gehlhausen-heath',
      main: 'main/main.js',
      description: packageJson.description,
      version: packageJson.version,
      build: {
        appId: 'com.heathgehlhausen.addachapter'
      },
    }),
  ],
  module: {
    rules: [
      { test: /\.(png|jpg|jpeg)$/i, use: ['url-loader'] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      { test: /\.hbs$/, use: ['handlebars-loader'] },
      // {
      //   test: /\.js$/, exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/env'],
      //       plugins: ['transform-class-properties']
      //     }
      //   }
      // },
    ],
  }
};
