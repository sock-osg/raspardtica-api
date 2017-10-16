'use strict';
var models = require('../models'),
    tools = require('../helpers/tools'),
    appError = require('../helpers/appErrors')
;

var usersBusiness = {};

usersBusiness.addUser = function(data, cb) {
  return models.users.create({
    firstName: data.firstName,
    lastName: data.lastName,
    password: tools.encryptPassword(data.password),
    email: data.email,
  }).then(function(createdUser) {
    createdUser.password = null;
    cb(null, createdUser);
  }).catch(function(error) {
    console.log(error);

    cb(error);
  });
};

module.exports = usersBusiness;
