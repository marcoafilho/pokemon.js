module.exports = {
  entry: ['./js/application.jsx'],
  output: {
    path: './build/',
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel', 'eslint'],
      }
    ]
  }
}
