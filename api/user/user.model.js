var mongoose = require('mongoose'),
    Schema = mongoose.Schema
   // bcrypt = require(bcrypt),
   //SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    myMaps:  [{ type :  Schema.Types.ObjectId, ref: 'myMap' }]
});

module.exports = mongoose.model('User', UserSchema);