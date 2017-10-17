'use strict'
// Models
var models = require('../models');

// Helpers
var nrfCmd = require('../helpers/nrfCmd');

// Business
var authBusiness = require('./auth');

var devicesBusiness = {};

devicesBusiness.create = function(data, token, cb) {
  authBusiness.getDecodedToken(token, function(error, decodedToken) {
    if (error) {
      cb(error);
    } else {
      data.userId = decodedToken.uuid;

      models.devices.create(data).then(function(createdDevice) {
        cb(null, createdDevice);
      }).catch(function(error) {
        cb(error);
      });
    }
  })
};

devicesBusiness.getAll = function(req, cb) {
  var token = req.headers.authorization.split(' ')[1];
  authBusiness.getDecodedToken(token, function(error, decodedToken) {
    if (error) {
      cb(error);
    } else {
      models.devices.findAll({
        where: {
          userId: decodedToken.uuid
        }
      }).then(function(devices) {
        cb(null, devices);
      }).catch(function(error) {
        cb(error);
      });
    }
  })
};

devicesBusiness.changeStatus = function(req, cb) {
  var token = req.headers.authorization.split(' ')[1];
  var deviceId = req.params.deviceId;
  var data = req.body;
  authBusiness.getDecodedToken(token, function(error, decodedToken) {
    if (error) {
      cb(error);
    } else {
      models.devices.findOne({ where: { id: deviceId }}).then(function(device) {
        if (device) {
          nrfCmd.sendCommand(data.status, device.portNumber, device.nrfId, function (cmdError, stdout, stderror) {
            if (cmdError) {
              cb(cmdError);
            } else {
              var rows = stdout.split('\n');
              var indexOk = rows.lastIndexOf('response: ok');
              var indexFail = rows.lastIndexOf('response: fail');

              if (indexOk >= 0 && indexFail === -1) {
                models.devices.update({ status: data.status }, { where: { id: deviceId, userId: decodedToken.uuid }}
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
    }
  })
};

module.exports = devicesBusiness;
