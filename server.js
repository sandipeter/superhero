//szükséges csomagok beolvasása
const express = require('express')
const fs = require('fs');
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

//var teszt_itf = require('./my_modules/itf_module')

//kapcsolódás az adatbázishoz
mongoose.connect('mongodb://localhost/test')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

//itf tábla model.
var itf = require('./models/itf')
//ez a külön fájlban van - kapcsolat megadása
itf.setConnection(mongoose);
itf.read({}, function(data){
	console.log(data);
});




//SAJÁT MODULE HASZNÁLATA
/*var str = "hello nodejs"

teszt_itf.tu(str, function (err, newStr) {
    if (err) {
        console.error(err);
    } else {
        console.log(newStr);
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
		console.log("Ajax kérés");
		res.send(JSON.stringify({
			'hello': 'world'
		}));
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
