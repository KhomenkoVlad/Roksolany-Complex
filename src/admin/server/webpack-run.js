const express = require('express');
module.exports = app => {
  const webpack = require('webpack');
  const config = require('../../../webpack.config.js')();
  const compiler = webpack(config);

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  );

  app.use(webpackDevMiddleware);
  const staticMiddleware = express.static('dist');

  app.use(staticMiddleware);
}