'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var SaveMapSchema = new Schema({
	items:      [{ type : ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('SaveMap', ItemSchema);