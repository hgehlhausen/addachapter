const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateJsonWebpackPlugin = require('generate-json-webpack-plugin');

const packageJson = require('./package.json');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: {
    'main/main': ['@babel/polyfill', './src/main/main.js'],
    'editor/index': ['@babel/polyfill', './src/editor/index.js'],
    'preview/index': ['@babel/polyfill', './src/preview/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new TerserPlugin({
      sourceMap: true,
      terserOptions: {
        drop_console: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'editor/index.html',
      chunks: ['editor/index'],
      template: 'src/editor/editor.hbs',
      description: 'editor window',
    }),
    new HtmlWebpackPlugin({
      filename: 'preview/index.html',
      chunks: ['preview/index'],
      template: 'src/preview/preview.hbs',
      description: 'preview window',
    }),
    new GenerateJsonWebpackPlugin('package.json', {
      name: 'add-a-chapter',
      author: {
        name: 'Heath Gehlhausen',
        email: 'heath.gehlhausen@gmail.com',
      },
      main: 'main/main.js',
      homepage: 'https://github.com/hgehlhausen/addachapter',
      license: 'SEE LICENSE IN LICENSE',
      description: 'Add-A-Chapter allows simple creation of good looking documents for Pen-and-paper RPGs',
      version: packageJson.version,
      scripts: {
        "dist": "electron-builder -wl",
      },
      build: {
        appId: 'com.hgehlhausen.addachapter',
        productName: 'AddAChapter',
        linux: {
          category: 'Utility',
          target: [
            'AppImage',
            'deb'
          ]
        },
        win: {
          target: 'portable',
          icon: './icon.ico',
        },
      },
      devDependencies: {
        electron: 'latest',
        'electron-builder': 'latest',
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/i,
        use: [{
          loader: 'url-loader', options: {
            limit: 16284,
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /icon\./i,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            limit: 0,
          }
        }]
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      { test: /\.hbs$/, use: ['handlebars-loader'] },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-react'],
            plugins: ['transform-class-properties'],
          }
        }
      },
    ],
  }
};
