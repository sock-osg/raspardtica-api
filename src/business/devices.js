'use strict'
var models = require('../models');
var nrfCmd = require('../helpers/nrfCmd');

var devicesBusiness = {};

devicesBusiness.create = function(data, cb) {
  return models.devices.create({
    nrfId: data.nrfId,
    alias: data.alias,
    description: data.description,
    status: 'OFF',
    userId: 1
  }).then(function(createdDevice) {
    cb(null, createdDevice);
  }).catch(function(error) {
    cb(error);
  });
};

devicesBusiness.getAll = function(data, cb) {
  return models.devices.findAll({
    status: 'OFF',
  }).then(function(devices) {
    cb(null, devices);
  }).catch(function(error) {
    cb(error);
  });
};

devicesBusiness.changeStatus = function(data, cb) {
  nrfCmd.sendCommand(data.status, data.deviceId, function (cmdError, stdout, stderror) {
    if (cmdError) {
      cb(cmdError);
    } else {
      return models.devices.update(
        {
          status: data.status
        },
        {
          where: {
            id: data.deviceId,
            userId: data.userId
          }
        }
      ).then(function() {
        cb(null, {});
      }).catch(function(error) {
        cb(error);
      });
    }
  });
};

module.exports = devicesBusiness;
