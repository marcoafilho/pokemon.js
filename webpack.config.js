module.exports = {
  entry: ['./js/application'],
  output: {
    path: './js/',
    filename: 'bundle.js',
    publicPath: '/'
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
