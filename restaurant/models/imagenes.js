var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Img_Schema = new Schema({
	title: {type: String, required: true}
});

var Imagen = mongoose.model('Imagen', Img_Schema);

module.exports = Imagen;