const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    mainFiles: ['index'],
    modules: [path.resolve(__dirname, './src'), path.resolve(__dirname, './node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
