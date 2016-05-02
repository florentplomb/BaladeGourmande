'use strict';

var _ = require('lodash');
var Item = require('./item.model');



module.exports = function connection (io) {

	socket.on('itemsToSave', function (itemsToSave) {
		Item.create(itemsToSave function(err, itemsSaved) {
			if(err) { console.log("Erorr to save item"); }
			console.log(itemSsaved);
		});
	});	

// exports.index = function(req, res) {
//   item.find(function (err, items) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, items);
//   });
// };

// // Get a single item
// exports.show = function(req, res) {
//   item.findById(req.params.id, function (err, item) {
//     if(err) { return handleError(res, err); }
//     if(!item) { return res.send(404); }
//     return res.json(item);
//   });
// };


}