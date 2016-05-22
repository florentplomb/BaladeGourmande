/**
 * Main application routes
 */

 'use strict';


 var _ = require('lodash');

 var Item = require('./item/item.model');
 var User = require('./user/user.model');
 var MyMap = require('./myMap/myMap.model');
 var SaveMap = require('./saveMap/saveMap.model');
 var deepPopulate = require('mongoose-deep-populate');
 var Thing = require('./thing/thing.model');

 module.exports = function connection(io) {
 	io.sockets.on('connection', function(socket) {


 		socket.on('get user map', function(userId, mapName) {
 			MyMap.findOne({
 				'name': mapName,
 				'user': userId
 			})
 			.deepPopulate('saveMap.items user -password')
 			.exec(function(err, myMap) {
 				if (err) return handleError(err);
 				if (myMap) {
 					if (myMap.saveMap.length > 0  ) {
 						socket.emit('map', myMap);
 					}								
 					console.log(myMap);
 				} 			})

 		})
			//****** TEST **********//
			//.deepPopulate('saveMap.items','','',{sort: {'createdOn' : -1 } ,limit: 1})
			// Thing.find(function(err, things) {
			// 	socket.emit('message', things);
			// });

		//****** ItemController **********//

		socket.on('itemsToSave', function(itemsToSave) {

			var idAdri = "57283e06b065849c28b03ea8";

			User.findById(idAdri)
			.populate('mymap')
				.exec(function(err, user) { // passer l'id quand on sauve un item. 
					if (err) return handleError(err);
					if (!user) return handleError(err);
					MyMap.findOne({
						'name': 'BaladeGroumande',
						'user': idAdri
					}, function(err, myMap) {
						if (err) return handleError(err);
						console.log(myMap);
						//if (myMap.length == 0) return handleError(err);
						if (!myMap) {
							console.log("la map existe PAS");
							MyMap.create({
								name: "BaladeGroumande"
							}, function(err, myMapSaved) {
								if (err) {
									console.log("Erorr to save map");
								}
								//console.log(myMapSaved);
								Item.create(itemsToSave, function(err, itemSaved) {
									if (err) {
										console.log("Erorr to save item");
									}
									console.log(itemSaved);
									var idItems = [];
									itemSaved.forEach(function(item) {
										idItems.push(item._id)
									})

									var savemap = new SaveMap();
									savemap.items = idItems;
									savemap.save(function(err, saveMapSaved) {
										if (err) return handleError(err);

										//console.log("saveMapSaved");
										myMapSaved.saveMap.push(saveMapSaved._id)
										myMapSaved.user = user._id
										myMapSaved.save(function(err, mapupdated) {
											if (err) return handleError(err);
											console.log("mapUdpated");
											user.myMaps.push(myMapSaved._id)
											user.save(function(err, muserupdated) {
												if (err) return handleError(err);
												console.log("userUpdated");

											})

										})
									})

								});

							})
						} else {
							console.log(itemsToSave);


							Item.create(itemsToSave, function(err, itemSaved) {
								if (err) {
									console.log("Erorr to save item");
								}
								//	console.log(itemSaved);
								var idItems = [];
								itemSaved.forEach(function(item) {
									idItems.push(item._id)
								})

								var savemap = new SaveMap();
								savemap.items = idItems;
								savemap.save(function(err, saveMapSaved) {
									if (err) return handleError(err);

									console.log(myMap);
									myMap.saveMap.push(saveMapSaved._id)
									myMap.save(function(err, mapupdated) {
										if (err) return handleError(err);
										console.log("mapupdated");
									})

								})

							});

						}



					})

				})


			});

	});

 }