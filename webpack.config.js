const webpack = require('webpack');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
    entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js' ],
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
        { test: /\.(woff|ttf|eot)$/i, loader: 'null-loader' },
   {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader'}
        ]
      },
         { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
    ],
  },
  resolve: {
       extensions: ['*', '.js', '.jsx'],
  },
  plugins: [HtmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './static', 
      hot: true,
  }
}  
