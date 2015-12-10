var User = require('./routes/models/user');
var configDB = require('./config/database.js');
var mongoose = require('mongoose');
mongoose.connect(configDB.url);


function testDB() {
	User.find({}, function (err, docs) {
        console.log(docs);
    });
}

// User.findById(id, function(err, user){
// 		console.log("Querying .......!!!");
// 				done(err, user);
// });

testDB();