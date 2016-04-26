/**
 * Main application routes
 */

 'use strict';


 var _ = require('lodash');

 var Thing = require('./thing/thing.model');

 module.exports = function(io) {

 	Thing.find(function (err, things) {
 		io.sockets.on('connection', function (socket) {
 			socket.emit('message', things);
 		});
 	});
 }


