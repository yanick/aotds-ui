//const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
//  parser: 'sugarss',
  plugins: [
      require('postcss-import')(),
    require('lost'),
    require('postcss-nesting')(),
      require('postcss-url')(),
  ],
    // 'postcss-import': {},
    // 'postcss-cssnext': {},
    // 'lost': {},
    // 'autoprefixer': {},
    // 'postcss-url': {},
//    'cssnano': {}
}
