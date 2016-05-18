'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ItemSchema = new Schema({
	type: String,
	properties: {
		user: String,
		icon: String,
		markerColor: String,
		title:String,
		message:String,
		distance: Number,
	},
	geometry: Schema.Types.Mixed
});

var deepPopulate = require('mongoose-deep-populate')(mongoose);
ItemSchema.plugin(deepPopulate);
module.exports = mongoose.model('Item', ItemSchema);