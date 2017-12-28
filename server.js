//szükséges csomagok beolvasása
const express = require('express')
const fs = require('fs');

var mongoose = require('mongoose')
mongoose.Promise = global.Promise;


//kapcsolódás az adatbázishoz
mongoose.connect('mongodb://localhost/superhero')
	.then(() => console.log('connection succesful'))
	.catch((err) => console.error(err));

//itf tábla model.
var Models = require('./models/models')


/*
Models.userCreate({

	name: 'jaill',
	email: 'jack@gmail.com',
	phone: '+3612345678',
	address: '1122 Budapest, Kis u. 10.',
	role: 3,
	meta: {
		birthsday: new Date('1994-07-04'),
		hobby: 'golf'
	},
	_orders: []
}, function(data){
  console.info('Saved model: ', data);
});
*/



//GET AL
Models.userRead({}, function (users) {
	console.info(users);
});

/*Models.userModel.remove({'name': new RegExp('jack', 'i')}, function(err, romoved){
	if (err){
		console.error(err);
	}else{
		//console.log('removed: ', romoved)
	};
});*/

//UPDATE
/*Models.userModel.update({name: new RegExp('doe', 'gi')}, {name: 'jason borne'},function(err,user){
	if(err){
		console.error(err);
	}else{
		console.log(user);
	};
});*/

//GET ONE
/*Models.userFirst({
	name: new RegExp('doe', 'gi')
}, function (users) {
	if (users !== null) {
		console.info(users.name);
	} else {
		console.info('no user');
	}
});*/

//GET ADMINS
/*Models.userModel.isAdmin(2, function (err, data) {
	console.log(err);
	console.log(data);
});*/





//rendelés mentése adott userhez
/*Models.userFirst({name: new RegExp('jaill', 'i')}, function (user) {
	if (user !== null) {
		Models.orderCreate({
			_user: user._id,
			insDate: new Date(),
			description: 'Az első vásárlás',
			product: 'Vasaló',
			amount: 9900,
			deadline: new Date('2018.01.01')}, function(data){
			console.log('USERRRR: ', data);
		});
	} else {
		console.info('no user');
	}
});*/





//globális változók
var port = 3000;
var staticDir = 'build';

//egy express szerver példány létrehozása
const app = express()
app.set('view engine', 'jade')
app.set('views', './src/view')


// Statikus fájlok.
app.use(express.static(staticDir));



app.use(function (req, res, next) {
	if (req.headers['x-requested-with'] == 'XMLHttpRequest') {

		Models.userRead({}, function (users) {
			res.send(users);
		});

	} else {
		next();
	}

});


app.get('/', function (req, res) {
	handleUsers(req, res, false, function (allUsers) {
		res.render('index', {
			title: 'Hey',
			message: 'Hello there!',
			users: allUsers
		})
	});
})

// Falhasználó modell.
function handleUsers(req, res, next, callBack) {
	fs.readFile('./users.json', 'utf8', function (err, data) {
		if (err) throw err;

		// var path = req.url.split( '/' );
		var users = JSON.parse(data);

		if (callBack) {
			callBack(users);
			return;
		};

		var _user = {};

		// Ha nem kaptunk id-t.
		if (!req.params.id) {
			_user = users;
		} else {
			for (var k in users) {
				if (req.params.id == users[k].id) {
					_user = users[k];
				}
			}
		}

		res.send(JSON.stringify(_user));
	});
}

// Felhasználók beolvasása.
app.get('/users/:id*?', function (req, res) {
	console.log(req.url);
	handleUsers(req, res);
});


// Megadjuk hogy a szerver melyik portot figyelje.
app.listen(port);

console.log("Server running in localhost:" + port);
