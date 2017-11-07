'use strict';
var models = require('../models'),
    tools = require('../helpers/tools'),
    appError = require('../helpers/appErrors')
;
var Sequelize = require('sequelize');

var usersBusiness = {};

usersBusiness.addUser = function(data, cb) {
  data.password = tools.encryptPassword(data.password);
  return models.users.create(data).then(function(createdUser) {
    createdUser.password = undefined;
    cb(null, createdUser);
  }).catch(Sequelize.ValidationError, function(error) {
    cb(appError.badRequestError);
  }).catch(function(error) {
    cb(error);
  });
};

module.exports = usersBusiness;
