'use strict'
// Models
var models = require('../models');

// Helpers
var nrfCmd = require('../helpers/nrfCmd');
var appError = require('../helpers/appErrors');

// Business
var authBusiness = require('./auth');

var Sequelize = require('sequelize');

var PORTS = Array.from({ length: 14 }, (value, key) => key);
var devicesBusiness = {};

devicesBusiness.create = (data, token, cb) => {
  authBusiness.getDecodedToken(token, (error, decodedToken) => {
    if (error) {
      cb(error);
    } else {
      data.userId = decodedToken.uuid;
      data.address = data.address.toLowerCase();

      models.deviceTypeConfigurations.findById(data.deviceTypeConfigurationsId)
      .then(config => {
        if (config.isSecureRequired && data.isSecure == undefined) {

        } else if () {

        }
      });

      models.devices.create(data).then(createdDevice => {
        cb(null, createdDevice);
      }).catch(error => {
        console.log(error);
        cb(error);
      });
    }
  })
};

devicesBusiness.getAll = (req, cb) => {
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

devicesBusiness.changeStatus = (req, cb) => {
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

devicesBusiness.availablePorts = (dataReques, cb) => {
  authBusiness.getDecodedToken(dataReques.token, (error, decodedToken) => {
    if (error) {
      cb(error);
    } else {
      models.devices.findAll({
        attributes: [ [Sequelize.fn('DISTINCT', Sequelize.col('address')), 'address'], ],
        where: {
          userId: decodedToken.uuid
        }
      }).then(availableAddress => {
        if (availableAddress.length == 0) {
          cb(null, []);
        } else {
          var response = [];

          Promise.all(availableAddress.map(currentRow => {
            var currAddress = currentRow.dataValues.address;

            return models.devices.findAll({
              attributes: [ 'port' ],
              where: {
                userId: decodedToken.uuid,
                address: currAddress
                /*$and: [
                  { userId: decodedToken.uuid },
                  Sequelize.where(Sequelize.fn('lower', Sequelize.col('address')), Sequelize.fn('lower', currAddress))
                ]*/
              }
            }).then((usedPortsObj) => {
              var usedPorts = usedPortsObj.map(portEntry => portEntry.dataValues.port);
              var ports = Array.from({ length: 14 }, (v, k) => k);
              var availablePorts = PORTS.filter(x => usedPorts.indexOf(x) == -1);

              response.push({
                address: currAddress,
                ports: availablePorts
              });
            }).catch((error) => {
              cb(error);
            });
          })).then(() => {
            cb(null, response);
          });
        }
      }).catch((error) => {
        cb(error);
      });
    }
  });
};

module.exports = devicesBusiness;
