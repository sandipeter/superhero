var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	address: String,
	role: Number,
	meta: {
		birthsday: Date,
		hobby: String
	}},{collection: 'Users'})


	UserSchema.statics.isAdmin = function(r, callback){
		return this.find({role:{$lte: 2}}, callback);
	}


module.exports = mongoose.model('User', UserSchema);

