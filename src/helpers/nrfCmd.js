'use strict';
var exec = require('child_process').exec;
var config = require('./../../config');

var nrfCommand = {};

nrfCommand.CMD = {
  ON: 81,
  OFF: 80,
  STATUS: 82
};

nrfCommand.sendCommand = function(command, deviceId, cb) {
  exec(config.cmd.script, ['-a', command, '-d', deviceId], cb);
};

module.exports = nrfCommand;
