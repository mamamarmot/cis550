var DB = require('./db').DB;
var User = DB.Model.extend({
	tableName: 'tablUsers',
	idAttribute: 'userId',
});

module.exports = {User: User};