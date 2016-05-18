'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var myMapSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	saveMap: [{
		type: Schema.Types.ObjectId,
		ref: 'SaveMap'
	}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}

});

var deepPopulate = require('mongoose-deep-populate')(mongoose);
myMapSchema.plugin(deepPopulate, {
	populate: {
		'saveMap': {
			options: {
				sort: {'createdOn' : -1 },
				limit: 10

			}
		}
	}
});

module.exports = mongoose.model('myMap', myMapSchema);