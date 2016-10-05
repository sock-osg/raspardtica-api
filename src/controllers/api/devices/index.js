'use strict';
var Device = require('../../../models/devices');
var User = require('../../../models/users');

var devicesController = {};

devicesController.myDevices = function(req, res) {
  User.find({username: req.params.username}, {devices: 1, _id: 0}, function(err, devices) {
    if (err) {
      res.json(err);
      res.status(500);
    }
    res.json(devices);
  });
};

devicesController.create = function(req, res) {
  var device = new Device({
    address: req.body.address,
    alias: req.body.alias,
    description: req.body.description
  });
  User.findOne({username: req.params.username}, function(err, user) {
    if (err) {
      res.json(err);
      res.status(500);
    }
    user.devices.push(device);
    user.save(function (err, user) {
      if (err) {
        res.json(err);
        res.status(500);
      } else {
        res.status(201);
        res.json(device);
      }
    })
  });
};

devicesController.delete = function(req, res) {
  Device.findOneAndRemove({username: req.params.username, "devices._id": req.params.deviceId}, function(err, offer) {
    if (err) {
      res.json(err);
      res.status(500);
    }
    res.status(200);
    res.json(offer);
  });
};

devicesController.routes = [
  {
    route: "/:username",
    method: "get",
    action: "myDevices"
  },
  {
    route: "/create/:username",
    method: "post",
    action: "create"
  },
  {
    route: "/:username/:deviceId",
    method: "delete",
    action: "delete"
  },
];

module.exports = devicesController;
