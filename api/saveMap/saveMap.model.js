'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var SaveMapSchema = new Schema({
	numeber : Number,
	items:      [{ type :  Schema.Types.ObjectId, ref: 'Item' }],
	createdOn: {
			type: Date,
			default: Date.now
		}
});

module.exports = mongoose.model('SaveMap', SaveMapSchema);