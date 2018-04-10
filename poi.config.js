module.exports = (options, req) => ({
  entry: [ 'babel-polyfill', './src/index.js' ],
  webpack(config) {
    config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
    return config
  }
})
