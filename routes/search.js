var mysql = require('mysql');
var connection = mysql.createConnection({
  host:"mysql.chz5igzhcu7z.us-east-1.rds.amazonaws.com",
  user: "cinderland",
  password: "cinderland",
  database: "cinderland",
  port:"3306"
});

connection.connect();

// get unique genres in database 
var genres = [];
var uniqueGenres = [];
var query = 'SELECT genres FROM Movie';
connection.query(query, function(err, rows, fields){
  if (err) throw err;
  for (var i in rows) {
    genres = genres.concat(rows[i].genres);
  }
  // get unique genres to display
  var temp = [];
  genres.forEach(function(str) {
    var str_array = str.replace(/\s/g,'').split("|");
    temp = temp.concat(str_array.slice(0,str_array.length-2));
  });
  uniqueGenres = temp.filter(function(elem, pos) {  //get unique genres from database
      return temp.indexOf(elem) == pos;
  });
  //console.log(uniqueGenres);
});

// get most recent movies in theater
var inTheater = [];

function generateResponse(req, res) {
	//var results = [];
	//var data = {text: req.body.text, complete: false};
	var movietitle = req.query.movietitle;

	console.log(movietitle);

	var query = "SELECT * FROM Movie WHERE title=" + "'" + movietitle + "'"; 
	connection.query(query, function(err, rows) {
		if (err!=null) {
			console.log("Connection to server failed.");
			//connection.close();
			res.render('error', {
				message: "Connection to server failed.",
				error: err
			});
		}
		else {
			console.log("Connected correctly to server.");
			if (err) throw err; 
			res.render('search.ejs', {
				title: 'movie_info',
				genres: uniqueGenres,
      			inTheater: inTheater,
				'mysql': rows} );
		}
	});
}



exports.displayResponse = function(req, res) {
	generateResponse(req, res);
};