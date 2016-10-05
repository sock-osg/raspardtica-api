'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  devices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device'}]
});

module.exports = mongoose.model('User', UserSchema);
