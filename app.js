var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var user = require('./routes/user');
var review = require('./routes/review');
var search = require('./routes/search');
var ejs = require('ejs');
//var LocalStrategy = require('passport-local').Strategy;

//login setup
//var session = require('express-session');
//var bcrypt = require('bcrypt-nodejs');
//var passport = require('passport');
//var flash = require('connect-flash');
//var mongoose = require('mongoose');
//var configDB = require('./config/database.js');

//connect to MongoDB database 
//mongoose.connect(configDB.url);

//custom libraries 
//var login = require('./login');
//var Model = require('./model');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({secret:'anystringoftext', saveUninitailized: true,resave: true}));
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());

//Router codes
app.use('/', routes);
app.get('/getReview', review.displayResponse);
app.get('/search', search.displayResponse);
//require('./config/passport')(passport);
//require('./routes/signup')(app, passport);

require('./test');


// passport.use(new LocalStrategy(function(username, password, done) {
//    new Model.User({username: username}).fetch().then(function(data) {
//       var user = data;
//       if(user === null) {
//          return done(null, false, {message: 'Invalid username or password'});
//       } else {
//          user = data.toJSON();
//          if(!bcrypt.compareSync(password, user.password)) {
//             return done(null, false, {message: 'Invalid username or password'});
//          } else {
//             return done(null, user);
//          }
//       }
//    });
// }));

// passport.serializeUser(function(user, done) {
//   done(null, user.username);
// });

// passport.deserializeUser(function(username, done) {
//    new Model.User({username: username}).fetch().then(function(user) {
//       done(null, user);
//    });
// });


//add the application middlewares 
// app.get('/login', login.signIn);
// app.post('/login', login.signInPost);
// app.get('/signup', login.signUp);
// app.post('/signup', login.signUpPost);

// app.get('/logout', login.signOut);


/* --- The followings are default setup ---*/

// view engine setup (default)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
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
