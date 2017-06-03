const path = require('path');

//const IconPlugin = require('svg-sprite-webpack-plugin').plugin;
//const iconPlugin = new IconPlugin('icons-[hash].svg');

module.exports = {
  module: {
    rules: [
      { test: /\.svg$/, //loader: iconPlugin.extract(), include: path.resolve(__dirname, '../')  },
          loader: 'svg-sprite-loader', include: path.resolve(__dirname, '../') },
      {  test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] }
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
