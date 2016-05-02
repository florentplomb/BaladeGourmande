'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ItemSchema = new Schema({
	type: String,
	properties: {
		user: String,
		icon: String,
		markerColor: String

	},
	geometry: Schema.Types.Mixed
});

module.exports = mongoose.model('Item', ItemSchema);