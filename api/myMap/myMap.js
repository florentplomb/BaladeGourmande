'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var myMapSchema = new Schema({
	name: { type: String, required: true, index: { unique: true } },
	save: [{ type : ObjectId, ref: 'SaveMap' }]
});

module.exports = mongoose.model('myMap', MapSchema);