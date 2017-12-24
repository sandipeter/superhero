//szükséges csomagok beolvasása
const express = require('express')
const fs = require('fs');

//globális változók
var port = 3000;
var staticDir = 'build';

//egy express szerver példány létrehozása
const app = express()

//statikus fájlok
app.use(express.static(staticDir))


//definiáljuk a szerver működését
app.get('/', (req, res) => {
    fs.readFile('./' + staticDir + '/index.html', 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data);
    })
})


//egy felhasználót visszaadó fv
function handleUsers(res, req) {
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


app.get('/users/:id', (req, res) => {
    console.log(req.url);
    handleUsers(res, req);
})

app.listen(port, () => console.log('Example app listening on port 3000!'))
