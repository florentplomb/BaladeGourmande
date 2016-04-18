
var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/app'));
console.log("Listening on " + process.env.PORT)
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});