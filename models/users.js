//Mongodb adatmodell.
//Kezeli a megadott táblát - users
var mongoose = require('mongoose');
var Users = require('../models/user.js');



//adatok olvasása a táblából - CRUD (READ)
function read(where, callBack) {
	if (!where){
		where = {};
	}
	Users.find(where, function (err, data) {
		if (err) {
			console.error("error in query", where);
			data = [];
		}
		if (callBack){
			callBack(data);
		}
	});
};

//egy dokumentum lekérése
function first(where, callBack){
	read(where, function(data){
		if(data.length>0){
			callBack(data[0]);
		}else{
			callBack(null);
		}
	})
}

//adatok beszúrása a táblából - CRUD (WRITE)
function create(document, callBack) {
  	var user = new Users(document);
  	user.save(function(err){
	if(err){
	  console.error('Save error: ', err)
	  callBack({})
	}else{
	  callBack(user);
	};
});
};



//Publikus elemek
module.exports = {
	read: read,
	create: create,
	first: first,
	model: Users
};
