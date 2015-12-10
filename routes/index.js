var express = require('express');
var router = express.Router();
//var appdata = require('../moviedata.json');
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
  var temp=[];
  genres.forEach(function(str) {
    var str_array = str.replace(/\s/g,'').split("|");
    temp = temp.concat(str_array.slice(0,str_array.length-2));
  });
  
  uniqueGenres = temp.filter(function(elem, pos) {  //get unique genres from database
      return temp.indexOf(elem) == pos;
  });
  console.log(uniqueGenres);
});

// get most recent movies in theater
var inTheater = [];
query = 'SELECT * FROM Movie';
connection.query(query, function(err, rows, fields){
  if (err) throw err;
  var count = 0;
  for (var i in rows) {
    if (count < 4) {
      inTheater = inTheater.concat(rows[i]);
    }
    count++;
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 						//render using 'index' template
  	title: 'Home', 								  //pass along title info
  	genres: uniqueGenres,					  //pass along unique genre info
  	inTheater: inTheater
    }); 								
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { 						//render using 'about' template
  	title: 'about', 							  //pass along title info
  	genres: uniqueGenres,						//leave the "genres" part
    inTheater: inTheater
  }); 								
});


/* GET genres page */
router.get('/genres', function(req, res, next) {
  //var movieids = [];
  var query = "SELECT * FROM Movie";
  connection.query(query, function(err, rows, fields){
    //if (err) throw err;
    res.render('genres', {
      title: 'movie_list',
      genres: uniqueGenres,
      inTheater: inTheater,
      'mysql': rows
    });
  });

});


/* GET movie list page */
router.get('/genres/:genreid', function(req, res, next) {
  var genreid = req.params.genreid;
  var query = "SELECT * FROM Movie WHERE genres LIKE '%" + genreid + "%'";
  
  connection.query(query, function(err, rows) {
    if (err) throw err;
    console.log("The genre user selected is: ");
    console.log(genreid);
    for (var i in rows) {
      console.log("The row is: ");
      console.log(rows[i]);
    }

    res.render('genres', {
      title: 'movie_list_by_genre',
      genres: uniqueGenres,
      inTheater: inTheater,
      'mysql': rows
    });
  });
});

module.exports = router;