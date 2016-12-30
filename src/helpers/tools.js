'use strict';
var crypto = require('crypto'),
    config = require('../../config');

var toolHelper = {};

toolHelper.encryptPassword = function(pass) {
  var value = null;
  try {
    value = crypto.createHash('sha256').update(pass).digest('base64');
  } catch (err) {
    console.log('crypto support is disabled!');
  }

  return value;
};

module.exports = toolHelper;
