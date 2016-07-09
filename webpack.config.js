module.exports = {
  context: __dirname + '/js',
  entry: ['./application.jsx'],
  output: {
    path: __dirname + '/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          presets: ['react']
        }
      }
    ]
  }
}
