'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var myMapSchema = new Schema({
	name: { type: String, required: true, index: { unique: true } },
	saveMap:  [{ type :  Schema.Types.ObjectId, ref: 'SaveMap' }],
	user: { type :  Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('myMap', myMapSchema);