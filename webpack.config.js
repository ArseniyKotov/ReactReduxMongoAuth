const path = require('path');
const SRC_DIR = path.join(__dirname, '/src');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      include: SRC_DIR,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-2']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
