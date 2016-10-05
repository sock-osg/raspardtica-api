'use strict';
var User = require('../../../models/users');
var mongoose = require('mongoose');

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
  var device = {
    _id: new mongoose.Types.ObjectId,
    address: req.body.address,
    alias: req.body.alias,
    description: req.body.description
  };
  User.findOneAndUpdate(
    {username: req.params.username},
    {$push: {devices: device}},
    {safe: true, upsert: true},
    function(err, _device) {
      if (err) {
        res.json(err);
        res.status(500);
      }
      res.status(201);
      res.json(_device);
    }
  );
};

devicesController.delete = function(req, res) {
  User.update({username: req.params.username}, {$pull: {"devices": {_id: req.params.deviceId}}}, function(err, offer) {
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
