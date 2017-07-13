const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'js', 'application'),
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        loaders: ['babel', 'eslint'],
      }
    ]
  }
}
