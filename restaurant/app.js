var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./src/routes/index');
var users = require('./src/routes/new');
var routes_app = require('./src/routes/routes_app');
var session_middleware = require('./middleware/session')
var cookieSession = require('cookie-session');
var UserRegister = require('./models/User').UserRegister;
// Express-Handlebars
var hbs = require('express-handlebars');
// Stylus
var stylus = require('stylus');
var app = express();


//Session Express - Middleware

app.use(cookieSession({
  name: "Session",
  keys: ["llave1 ","llave2"]
}));

// Compile stylus to css - Middleware

app.use(
  stylus.middleware({
    src: __dirname + '/stylus',
    dest: __dirname + '/public/css',
    compile: function(str, path){
              return 
              stylus(str)
              .set('filename', path)
              .set('compress', true);
    }
  })
  );




// Engine of Handlebars
app.engine('hbs', hbs({
  extname:'hbs',
  defaultLayout: 'main',
  layoutsDir:__dirname + '/views/layouts'}
));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/new', users);
app.use('/app', session_middleware);
app.use('/app', routes_app)
// ventanas


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


module.exports = app;
