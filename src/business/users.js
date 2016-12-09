'use strict';
var models = require('../models');

var usersBusiness = {};

usersBusiness.addUser = function(data, cb) {
  return models.users.create({
    id: 1,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    email: data.email,
  }).then(function(createdUser) {
    cb(null, createdUser);
  }).catch(function(error) {
    cb("User couldn't be created");
  });
};

module.exports = usersBusiness;
