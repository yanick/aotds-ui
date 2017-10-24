const path = require('path');

//const IconPlugin = require('svg-sprite-webpack-plugin').plugin;
//const iconPlugin = new IconPlugin('icons-[hash].svg');

module.exports = {
  module: {
    rules: [
        { test: /\.(woff|ttf|eot)$/i, loader: 'null-loader' },
      { test: /\.svg$/, //loader: iconPlugin.extract(), include: path.resolve(__dirname, '../')  },
          loader: 'svg-sprite-loader', include: path.resolve(__dirname, '../') },
      {  test: /\.css$/, loaders: [
           'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: true }  },
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } }
      ]
      },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
     resolve: {
         modules: [
             path.resolve(__dirname, '../../battle/dist') ,
             'node_modules'
         ]
    //       alias: {
    //               '@storybook/addons': require.resolve('@storybook/addons')
    //             }
     }
}
