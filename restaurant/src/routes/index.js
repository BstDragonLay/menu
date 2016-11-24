var express = require('express');
var router = express.Router();
var session = require('express-session');
var UserRegister = require('./../../models/User').UserRegister;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'APP'
  	 });
  console.log(req.session.user_id);
});


router.get('/get-data', function(req, res, next) {
	UserRegister.find()
	.then(function(doc){
		res.render('index', {items: doc});
	});
});

router.post('/register', function(req, res, next) {
	var item = {
		name: req.body.name,
		password: req.body.password
	};

	var data = new UserRegister(item);
	data.save();
	

	res.redirect('/');
});

router.post('/login', function(req, res){
	UserRegister.findOne({name:req.body.name, password: req.body.password}, function(err, user){
		if(err){
			console.log(String(err));

		}
		req.session.user_id = user._id;
		res.redirect('/app');
	});
	
});


/*router.post('/update', function(req, res, next) {
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

/*router.post('/delete', function(req, res, next) {
	var id = req.body.id;
	UserData.findByIdAndRemove(id).exec();
	
	res.redirect('/');
});*/
module.exports = router;
