var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: String,
	phone: String,
	address: String,
	role: Number,
	meta: {
		birthsday: Date,
		hobby: String
	},
	_orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
}, {
	collection: 'Users'
})


UserSchema.statics.isAdmin = function (r, callback) {
	return this.find({
		role: {
			$lte: 2
		}
	}, callback);
}



var OrderSchema = new Schema({
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	insDate: Date,
	description: String,
	product: String,
	amount: Number,
	deadline: Date,
}, {
	collection: 'Orders'
})

var Order = mongoose.model('Order', OrderSchema);
var User = mongoose.model('User', UserSchema);






//adatok olvasása a táblából - CRUD (READ)
function userRead(where, callBack) {
	if (!where) {
		where = {};
	}
	User.find(where, function (err, data) {
		if (err) {
			console.error("error in query", where);
			data = [];
		}
		if (callBack) {
			callBack(data);
		}
	});
};

//egy dokumentum lekérése
function userFirst(where, callBack) {
	userRead(where, function (data) {
		if (data.length > 0) {
			callBack(data[0]);
		} else {
			callBack(null);
		}
	})
}

//adatok beszúrása a táblából - CRUD (WRITE)
function userCreate(document, callBack) {
	var user = new User(document);
	user.save(function (err) {
		if (err) {
			console.error('Save error: ', err)
			callBack({})
		} else {
			callBack(user);
		};
	});
};


//adatok beszúrása a táblából - CRUD (WRITE)
function orderCreate(document, callBack) {
	var order = new Order(document);
	order.save(function (err) {
		if (err) {
			console.error('Save error: ', err)
			callBack({})
		} else {
			callBack(order);
		};
	});
};



//Publikus elemek
module.exports = {
	userRead: userRead,
	userCreate: userCreate,
	orderCreate: userCreate,
	userFirst: userFirst,
	userModel: User,
	orderModel: Order

};
