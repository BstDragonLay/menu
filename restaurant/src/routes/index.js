var express = require('express');
var router = express.Router();
// mongo
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Restaurant Menu APP'
  	 });
});

router.get('/get-data', function(req, res, next) {
	var resultArray = [];

	mongo.connect(url, function(err, db) {
		//error
		assert.equal(null, err);
		//well
		var curso = db.collection('user-data').find();
		curso.forEach(function(doc, err){
			assert.equal(null, err);
			resultArray.push(doc);

		}, function(){
			db.close();
			res.render('index', {items: resultArray});
		});
	});
});

router.post('/insert', function(req, res, next) {
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};

	mongo.connect(url, function(err, db){
		//error
		assert.equal(null, err);
		//well
		db.collection('user-data').insertOne(item, function(err, result) {
			//error
			assert.equal(null, err);
			//well
			console.log('items inserted');
			db.close();
		});
	});


	res.redirect('/');
});

router.post('/update', function(req, res, next) {
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};
	var id = req.body.id;
	mongo.connect(url, function(err, db){
		//error
		assert.equal(null, err);
		//well
		db.collection('user-data').updateOne({"_id": objectId(id)},{$set: item}, function(err, result) {
			//error
			assert.equal(null, err);
			//well
			console.log('items update');
			db.close();
		});
	});
	res.redirect('/');
});

router.post('/delete', function(req, res, next) {

	var id = req.body.id;
	mongo.connect(url, function(err, db){
		//error
		assert.equal(null, err);
		//well
		db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
			//error
			assert.equal(null, err);
			//well
			console.log('items deleted');
			db.close();
		});
	});
	res.redirect('/');
});
module.exports = router;
