'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  devices: [{
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  }]
});

module.exports = mongoose.model('User', UserSchema);
