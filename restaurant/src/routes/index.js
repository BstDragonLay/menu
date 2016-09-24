var express = require('express');
var router = express.Router();
// mongoose
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;


//schema to structur the data files on the module
var userDataSchema = new Schema({
	title: {type: String, required: true},
	content: String,
	author: String,
	date: {type: Date, default: Date.now}
}, {collection: 'UserData'});

//Call the collection or module that are going to catch all the Schema

var UserData = mongoose.model('UserData', userDataSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Restaurant Menu APP'
  	 });
});

router.get('/get-data', function(req, res, next) {
	UserData.find()
	.then(function(doc){
		res.render('index', {items: doc});
	});
});

router.post('/insert', function(req, res, next) {
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		date: req.body.date
	};

	var data = new UserData(item);
	data.save();
	

	res.redirect('/');
});

router.post('/update', function(req, res, next) {
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		date: req.body.date
	};

	var id = req.body.id;

	UserData.findById(id, function(err, doc){
		if (err) {
			console.log('Error en la busqueda de datos');
		}
		doc.title = req.body.title;
		doc.content = req.body.content;
		doc.author = req.body.author;
		doc.date = req.body.date;
		doc.save();
	});
	
	res.redirect('/');
});

router.post('/delete', function(req, res, next) {
	var id = req.body.id;
	UserData.findByIdAndRemove(id).exec();
	
	res.redirect('/');
});
module.exports = router;
