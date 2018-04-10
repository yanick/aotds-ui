const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
    entry: ['babel-polyfill', './src/index.js' ],
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
        { test: /\.(woff|ttf|eot)$/i, loader: 'null-loader' },
      { test: /\.svg$/, loader: 'svg-sprite-loader' },
      {  test: /\.css$/, use: [
           'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: true }  },
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } }
      ]
      },
      { test: /\.vue$/, loader: 'vue-loader' },
    ],
  },
  resolve: {
    alias: { 'vue$': 'vue/dist/vue.esm.js' }
  }
  plugins: [HtmlWebpackPluginConfig]
}
