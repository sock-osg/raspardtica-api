'use strict';
var models = require('../models'),
    tools = require('../helpers/tools')
;

var usersBusiness = {};

usersBusiness.addUser = function(data, cb) {
  return models.users.create({
    firstName: data.firstName,
    lastName: data.lastName,
    password: tools.encryptPassword(data.password),
    email: data.email,
  }).then(function(createdUser) {
    cb(null, createdUser);
  }).catch(function(error) {
    cb(error);
  });
};

module.exports = usersBusiness;
