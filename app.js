var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var mongoose = require('mongoose');
var sass = require('node-sass-middleware');
var cookieParser = require('cookie-parser');
var debug = require('debug');
// var bower = require('bower');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev')); // a development logger, will give a diff output if it was a diff loger.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sass({
    src: __dirname + '/assets', //where the sass files are 
    dest: __dirname + '/public', //where css should go
    debug: true
  })
);
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes); // what returns from this middleware? a function with req, res, and next, object, and a router object function middleare. We're exporting a router, a router is middleware, and we're requiring that middleware
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  swig.setDefaults({ cache: false });
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
  console.log({error: err});
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
