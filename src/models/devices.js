'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  address: { type: String, required: true },
  alias: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Device', DeviceSchema);
