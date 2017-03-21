'use strict'
var models = require('../models');
var tools = require('../helpers/tools');

var devicesBusiness = {};

devicesBusiness.create = function(data, cb) {
  return models.devices.create({
    nrfId: data.nrfId,
    alias: data.alias,
    description: data.description,
    status: false,
    userId: 1
  }).then(function(createdDevice) {
    cb(null, createdDevice);
  }).catch(function(error) {
    cb(error);
  });
};

devicesBusiness.getAll = function(data, cb) {
  return models.devices.findAll({
    status: false,
  }).then(function(devices) {
    cb(null, devices);
  }).catch(function(error) {
    cb(error);
  });
};

module.exports = devicesBusiness;
