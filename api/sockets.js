/**
 * Main application routes
 */

 'use strict';


 var _ = require('lodash');

 var Item = require('./item/item.model');
 var User = require('./user/user.model');
 var myMap = require('./myMap/myMap.model');

 var Thing = require('./thing/thing.model');

 module.exports = function connection(io) {
 	io.sockets.on('connection', function(socket) {
		//****** TEST **********//

		// Thing.find(function(err, things) {
		// 	socket.emit('message', things);
		// });

		//****** ItemController **********//

		socket.on('itemsToSave', function(itemsToSave) {

			var idAdri = "57283e06b065849c28b03ea8";

			User.findById(idAdri)
			.populate('mymap')
				  .exec(function (err, user) { // passer l'id quand on sauve un item. 
				  	if (err) return handleError(err);
				  	if (!user) return handleError(err);

				  	myMap.findOne({ 'name': 'BaladeGroumande' , _id :idAdri }, function (err, map) {
				  		if (err) return handleError(err);
				  		if (!map) {
				  			Map.create({name:"BaladeGroumande"}, function(err, mapSaved) {
				  				if (err) {
				  					console.log("Erorr to save item");
				  				}
				  				console.log(mapSaved);
				  			})
				  		}

				  	})

				  })	

				  Item.create(itemsToSave, function(err, itemSaved) {
				  	if (err) {
				  		console.log("Erorr to save item");
				  	}
				  	console.log(itemSaved);
				  });
				});

	});

 }