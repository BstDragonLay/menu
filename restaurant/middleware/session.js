var UserRegister = require('./../models/User').UserRegister;

module.exports = function(req, res, next){
	if(!req.session.user_id){
		res.redirect('/')
	}
	else{
		UserRegister.findById(req.session.user_id, function(err, user){
			if(err)
			{
				console.log(err);
				res.redirect('/login')
			}else{
				res.locals = { user : user }
				next();
			}
		});
		
	}
};