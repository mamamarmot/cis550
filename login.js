var mysql = require('mysql');

//vendor library
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

//custom library
//model
var Model = require('./model');

//log in GET
var signIn = function(req, res, next) {
	if (req.isAuthenticated()) res.redirect('/');
	res.render('login', {title: 'Sign In'});
};

//log in POST
var signInPost = function(req, res, next) {
   passport.authenticate('local', { successRedirect: '/',
                          failureRedirect: '/login'}, function(err, user, info) {
      if(err) {
         return res.render('login', {title: 'Sign In', errorMessage: err.message});
      } 

      if(!user) {
         return res.render('login', {title: 'Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.render('login', {title: 'Sign In', errorMessage: err.message});
         } else {
            return res.redirect('/');
         }
      });
   })(req, res, next);
};

//sign up GET
var signUp = function(req, res, next) {
   console.log("Signing you up!");
   if(req.isAuthenticated()) {
   	  console.log("Request is authenticated!!!!!!!!!!!!!!!!!!");
      res.redirect('/');
   } else {
   	  console.log("Request is not authenticated!!!!!!!!!!!!!!");
      res.render('signup', {title: 'Sign Up'});
   }
};

//sign up POST
var signUpPost = function(req, res, next) {
   var user = req.body;
   var username = req.body.username;
   var password = req.body.password;
   console.log("The username and password you entered are:::::::::");
   console.log(username);
   console.log(password);

	var connection = mysql.createConnection({
	  host:"mysql.chz5igzhcu7z.us-east-1.rds.amazonaws.com",
	  user: "cinderland",
	  password: "cinderland",
	  database: "cinderland",
	  port:"3306"
	});

	connection.connect();

	var person = {
		username: req.body.username,
		password: req.body.password
	};

	var query = connection.query('INSERT INTO tblUser SET ?', person, function(err, result){
		console.log("Successfully added user into our database!!!!!");
	});

	// var query1 = 'INSERT INTO tblUser(username)' + 'VALUES(' + username + ')';
	// var query2 = 'INSERT INTO tblUser(password)' + 'VALUES(' + password + ')';

	// console.log(query1);

	// connection.query(query1, function(error, res){
	// 	if (error) console.log(error.message);
	// 	else console.log("Successfully added user to our database!!!!!\n");
	// });

	// connection.query(query2, function(error){
	// 	if (error) console.log(error.message);
	// 	else console.log("Successfully added user to our database!!!!!\n");
	// });

   // var signUpUser = new Model.User({username: user.username, password: user.password});
   // signUpUser.save();
   // var usernamePromise = null;
   // usernamePromise = new Model.User({username: user.username}).fetch();

   // return usernamePromise.then(function(model) {
   //    if(model) {
   //       res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
   //    } else {
   //       //****************************************************//
   //       // PASSWORD VALIDATION GOES HERE
   //       //****************************************************//
   //       var password = user.password;
   //       var hash = bcrypt.hashSync(password);

   //       var signUpUser = new Model.User({username: user.username, password: hash});

   //       signUpUser.save().then(function(model) {
   //          // sign in the newly registered user
   //          signInPost(req, res, next);
   //       });	
   //    }
   // });
};


// sign out
var signOut = function(req, res, next) {
   if(!req.isAuthenticated()) {
      notFound404(req, res, next);
   } else {
      req.logout();
      res.redirect('/login');
   }
};

// 404 not found
var notFound404 = function(req, res, next) {
   res.status(404);
   res.render('404', {title: '404 Not Found'});
};

// export functions
/**************************************/

// sigin in
// GET
module.exports.signIn = signIn;
// POST
module.exports.signInPost = signInPost;

// sign up
// GET
module.exports.signUp = signUp;
// POST
module.exports.signUpPost = signUpPost;

// sign out
module.exports.signOut = signOut;

// 404 not found
module.exports.notFound404 = notFound404;

