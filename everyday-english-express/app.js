var log4js = require('log4js');
log4js.configure('log4js.json', {});

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./models')
var routes = require('./routes/index');
var users = require('./routes/users');
var sentences = require('./routes/sentences');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
var logger = log4js.getLogger('http');
// app.use(logger('dev'));
app.use(log4js.connectLogger(logger, {level:log4js.levels.DEBUG}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'app')));

app.use('/', routes);
app.use('/users', users);
app.use('/sentences', sentences);
// apis 
var apis = require('./routes/apis');
app.use('/api', apis);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.locals.pretty = true;
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

db.sequelize
  .sync({ force: false })
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      logger.info('db sync successfully');
    }
  })

module.exports = app;
