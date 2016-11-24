var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

//schema to structur the data files on the module
var userDataSchema = new Schema({
	name: {type: String, required: true},
	password: String
}, {collection: 'UserRegister'});

var UserRegister = mongoose.model('UserRegister', userDataSchema);

module.exports.UserRegister = UserRegister;