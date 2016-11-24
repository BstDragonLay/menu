var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register',{
  	message: "error en la pagina"
  });
});
router.get('/login', function(req, res, next) {
  res.render('login',{
  	message: "error en la pagina"
  });
});
module.exports = router;
