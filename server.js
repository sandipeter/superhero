//szükséges csomagok beolvasása
const express = require('express')
const fs = require('fs');
var itf = require('./my_modules/itf_module')


//SAJÁT MODULE HASZNÁLATA
/*var str = "hello nodejs"

itf.tu(str, function (err, newStr) {
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

//statikus fájlok
app.use(express.static(staticDir))

//Express use használata
app.use(function (req, res, next) {
    console.log('request.url: ',req.url);
    next();
});


//definiáljuk a szerver működését
app.get('/', (req, res, next) => {
    fs.readFile('./' + staticDir + '/index.html', 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});


//egy felhasználót visszaadó fv
function handleUsers(req, res) {
    fs.readFile("./users.json", 'utf8', (err, data) => {
        if (err) throw err;

        var users = JSON.parse(data);
        var _user = {};

        if (!req.params.id) {
            _user = users;
        } else {
            for (k in users) {
                if (users[k].id = req.params.id) {
                    _user = users[k];
                }
            }
        }

        res.send(JSON.stringify(_user))
    });
}


app.get('/users/:id*?', (req, res, next) => {
    console.log(req.url);
    handleUsers(req, res);
})

app.listen(port, () => console.log('Example app listening on port 3000!'))
