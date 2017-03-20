var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

const router = express.Router();

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var tables = require('./routes/tables');
var forms = require('./routes/forms');

var inventory = require('./model/inventory');
var studentData = require('./model/studentData');

passport.use(new LocalStrategy(studentData.authenticate()));
passport.serializeUser(studentData.serializeUser());
passport.deserializeUser(studentData.deserializeUser());


var MongoURI=('mongodb://warren:brnb123@ds163699.mlab.com:63699/finalproject-inventory');
mongoose.connect(MongoURI);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
            "maxAge": 86400000,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', login);
app.use('/users', users);
app.use('/index', index);
app.use('/register', register);
app.use('/tables', tables);
app.use('/forms', forms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
