var User = require('./models/user');

module.exports = function(app, passport) {

	//login page
	app.get('/login', function(req, res) {
		res.render('login.ejs', {
			title: 'loginformovielounge',
			message: req.flash('loginMessage')});
	});

	app.post('/login', function(req, res) {
	  	res.redirect('/');
	});

	// app.post('/login', passport.authenticate('local-login', {
	// 	successRedirect: '/',
	// 	failureRedirect: '/login',
	// 	failureFlash: true
	// }));
	
	//sign-up page
	app.get('/signup', function(req, res){
	  res.render('signup', {
	  	title: 'signupformovielounge',
	  	message: req.flash('signupMessage')});
	});

	app.post('/signup', function(req, res) {
		var newUser = new User();
	  	newUser.local.email = req.body.email;
	  	newUser.local.password = req.body.password;
	  	newUser.save(function(err) {
	    if (err) throw err;
	  	});
	  	res.redirect('/');
	});

	app.get('/profile', function(req, res){				//note: deleted isLoggedIn 
		res.render('profile.ejs', {
			//user: req.user;
			user: "TingWang"
		});
	});

	// app.post('/signup', passport.authenticate('local-signup', {
	//   successRedirect: '/',
	//   failureRedirect: '/signup',
	//   failureFlash: true
	// }));

	// app.get('/:username/:password', function(req, res){
	//   var newUser = new User();
	//   newUser.local.username = req.params.username;
	//   newUser.local.password = req.params.password;
	//   console.log(newUser.local.username + " "+ newUser.local.password);
	//   newUser.save(function(err) {
	//     if (err) throw err;
	//   });
	//   res.send("Regestration successful!");
	// })

	// Facebook login
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', {successRedirect: '/profile', 
											failureRedirect: '/login'}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/login');
}