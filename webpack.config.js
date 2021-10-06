var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './app/index.js',
  output: { path: __dirname, filename: 'bundle.js' },
  resolve: {
    modules: [
        path.join(__dirname, "js"), "node_modules"
    ]
},
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }]
      }
    ]
  },
};