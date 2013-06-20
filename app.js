var express = require('express'), http = require('http');
var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

var players = [];
players.push({ id:1, Name:"A"});
players.push({ id:2, Name:"B"});


app.get("/players", function (req, res) {
    console.log('Hit GET');
    res.json(players);
});

app.post('/players', function (req, res) {
    console.log('Hit POST');
    var player = { id: players.length+1, name: req.body.Name};
    players.push(player)
    res.json(player);
});

app.put("/players/:id", function (req, res) {
    console.log('Hit PUT');
    var player = players[req.body.id-1];
    player.Name = req.body.Name;
    res.json(player);
});

app.delete("/players/:id", function (req, res) {
    console.log('Hit DELETE');
    players.slice(req.body.id-1,1);
    res.send(200);
});

http.createServer(app).listen(3000);