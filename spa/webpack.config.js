const path = require("path");
const webpack = require('webpack');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');


function getEntry(){
  let entry = {};
  let app = [];

  // 'react-hot-loader/patch' should be the first item
  if (!isProd) {
    app.push('react-hot-loader/patch');
  }
  app.push('./js/index.jsx', 'babel-polyfill');

  entry.app = app;

  return entry;
}

function getOutput(){
  let output = {
      publicPath: '/',
      path: path.resolve(__dirname, './assets/bundles'),
      filename: "[name]-[hash].js",
  };

  return output;
}

function getDevServer(){
  let devServer = {};
  if (!isProd) {
    devServer = {
      hot: true,
      host: "0.0.0.0",
      port: 8000,
      inline: true,
      contentBase: path.resolve(__dirname, './assets'),
      disableHostCheck: true,
      publicPath: '/',
      historyApiFallback: true,
    }
  }
  return devServer;
}

function getWatchOptions(){
  let watchOptions = {
    aggregateTimeout: 300,
    poll: 1000
  };

  return watchOptions;
}

function getPlugins() {
  let plugins = [];

  plugins.push(new CleanObsoleteChunks());
  plugins.push(new HtmlWebpackPlugin({
    template: './js/index.ejs'
  }));

  if (isProd) {
    plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }));

    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));

    plugins.push(new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }));

  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return plugins;
}

function getModule() {
    let module = {};
    let rules = [];

    let rule1Plugins = [];
    if (!isProd) {
      rule1Plugins.push("react-hot-loader/babel");
    }
    let rule1 = {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["latest", "es2015"],
                            "react"
                        ],
                        plugins: rule1Plugins
                    }
                }
            };
    rules.push(rule1);

    module.rules = rules;
    return module;
}

function getResolve() {
  let resolve = {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
  };

  return resolve;
}

function getDevtool() {
    let devtool = "";

    if (isProd) {
      devtool = 'source-map'
    } else {
      devtool = 'cheap-module-eval-source-map'
    }

    return devtool;
}

const config = {
    context: __dirname,
    entry: getEntry(),
    output: getOutput(),
    plugins: getPlugins(),
    module: getModule(),
    resolve: getResolve(),
    devtool: getDevtool(),
    devServer: getDevServer(),
    watchOptions: getWatchOptions()
};

module.exports = config;