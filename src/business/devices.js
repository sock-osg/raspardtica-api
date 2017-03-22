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
  models.devices.findOne({ where: { id: data.deviceId }}).then(function(device) {
    if (device) {
      nrfCmd.sendCommand(data.status, device.nrfId, function (cmdError, stdout, stderror) {
        console.log(stdout);

        if (cmdError) {
          cb(cmdError);
        } else {
          var rows = stdout.split('\n');
          var indexOk = rows.lastIndexOf('response: ok');
          var indexFail = rows.lastIndexOf('response: fail');

          if (indexOk >= 0 && indexFail === -1) {
            models.devices.update({ status: data.status }, { where: { id: data.deviceId, userId: data.userId }}
            ).then(function() {
              cb(undefined, undefined);
            }).catch(function(error) {
              cb(error);
            });
          } else {
            cb('Error sending command');
          }
        }
      });
    } else {
      cb('Not Found');
    }
  })
};

module.exports = devicesBusiness;
