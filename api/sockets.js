/**
 * Main application routes
 */

'use strict';


var _ = require('lodash');

var Item = require('./item/item.model');
var Thing = require('./thing/thing.model');

module.exports = function connection(io) {
	io.sockets.on('connection', function(socket) {
		//****** TEST **********//

		// Thing.find(function(err, things) {
		// 	socket.emit('message', things);
		// });

		//****** ItemController **********//

		socket.on('itemsToSave', function(itemsToSave) {
			Item.create(itemsToSave, function(err, itemSaved) {
				if (err) {
					console.log("Erorr to save item");
				}
				console.log(itemSaved);
			});
		});

	});

}