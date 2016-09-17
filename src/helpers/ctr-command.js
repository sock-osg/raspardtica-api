'use strict';
var exec = require('child_process');

var controlCommand = {};

controlCommand.sendCommand = function(command, deviceId) {
  exec.execFile('../remote', ['-c', command, '-d', deviceId], function (error, stdout, stderr) {
    var state = -1;
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (stdout.indexOf("Got this response") > -1) {
      state = stdout.split('Got this response ')[1].split('.')[0];
    }

    if (error !== null) {
      console.log('exec error: ' + error);
    }
    return state;
  });
};

module.exports = controlCommand;
