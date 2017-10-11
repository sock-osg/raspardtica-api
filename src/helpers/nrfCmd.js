'use strict';
var exec = require('child_process').exec;
var config = require('./../../config');

var nrfCommand = {};

nrfCommand.CMD = {
  ON: 1,
  OFF: 0,
  STATUS: 2
};

nrfCommand.sendCommand = function(command, portNumber, deviceId, cb) {
  exec(config.cmd.script
        + ' -a ' + portNumber + this.CMD[command]
        + ' -d ' + deviceId, cb);
};

module.exports = nrfCommand;
