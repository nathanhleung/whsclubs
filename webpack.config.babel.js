import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const config = {
  entry: [
    // babel-polyfill is loaded via CDN, see https://phabricator.babeljs.io/T7348
    path.join(__dirname, 'client', 'src', 'entry.js'),
  ],
  output: {
    path: path.join(__dirname, 'client', '_build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
      },
      {
        test: /\.css$/,
        // see https://github.com/postcss/postcss-loader for query param info
        loader: ExtractTextPlugin.extract(['css?modules&importLoaders=1', 'postcss']),
      },
      {
        test: /\.jade$/, // so that our IDE automatically detects Jade highlighting
        loaders: ['pug'],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlPlugin({
      template: path.join(__dirname, 'client', 'src', 'index.jade'),
    }),
  ],
  postcss() {
    return [precss, autoprefixer];
  }
};

export default config;