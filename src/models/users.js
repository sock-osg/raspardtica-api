'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  devices: [{
    _id: Schema.Types.ObjectId,
    address: { type: String, required: true },
    alias: { type: String, required: true },
    description: { type: String, required: true }
  }]
});

module.exports = mongoose.model('User', UserSchema);
