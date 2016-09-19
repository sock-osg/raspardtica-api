'use strict';
var express = require('express');
var router = express.Router();

var devicesController = require('../controller/api/devices/index');

router.put('/on/:deviceId', function(request, response) {
  var deviceId = request.params.deviceId;
  var data = {
    deviceId: deviceId
  };

  return response.render(devicesController.turnOn(data));
});

router.put('/off/:deviceId', function(request, response) {
  var deviceId = request.params.deviceId;
  var data = {
    deviceId: deviceId
  };

  return response.render(devicesController.turnOff(data));
});

router.get('/status/:deviceId', function(request, response) {
  var deviceId = request.params.deviceId;
  var data = {
    deviceId: deviceId
  };

  return response.json({status: devicesController.getStatus(data)});
});

module.exports = router;
