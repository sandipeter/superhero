//Mongodb adatmodell.
//Kezeli a megadott táblát - itf
var db;
var Itf;

function setConnection(mongodb) {
	db = mongodb;
	setModel();
};


//Kollekció model - shema
function setModel(){

	var dataSchema = db.Schema({
		name: String,
		email: String,
		orders: {
			date: Date,
			amount: Number,
			status: String,
			product: String
		}
	}, {collection: 'itf'});


	Itf = db.model('itf', dataSchema);

	//var user = new Itf({name: 'Joe'});
	//user.save();

};


//var Kitten = mongoose.model('Itf', Itf);
//adatok olvasása a táblából - CRUD (READ)

function read(where, callBack) {
	Itf.find(where, function (err, data) {
		if (err) {
			console.error("error in query", where);
			callBack({});
		} else {
			callBack(data);
		}
	});
};




//Publikus elemek
module.exports = {
	setConnection: setConnection,
	read: read
};
