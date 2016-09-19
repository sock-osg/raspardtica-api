'use strict';
var controlCommand = require('../../../helpers/ctr-command');

var devicesController = {};

devicesController.COMMANDS = {
  ON: 81,
  OFF: 80,
  STATUS: 82
};

devicesController.turnOn = function(data) {
  return controlCommand.sendCommand(this.COMMANDS.ON, data.deviceId);
};

devicesController.turnOff = function(data) {
  return controlCommand.sendCommand(this.COMMANDS.OFF, data.deviceId);
};

devicesController.getStatus = function(data) {
  return controlCommand.sendCommand(this.COMMANDS.STATUS, data.deviceId);
}

module.exports = devicesController;
