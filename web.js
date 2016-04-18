
'use strict';

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/app'));
console.log("Listening on " + port)
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

  app.get('/api',function(req, res){
        return res.json({ port: port });
    });