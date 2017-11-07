'use strict';
var restifyHelper = require('../../../helpers/restify');
var devicesBusiness = require('./../../../business/devices');

var devicesController = {};

devicesController.create = function(req, res, next) {
  var data = req.body;
  var token = req.headers.authorization.split(' ')[1];

  devicesBusiness.create(data, token, function(err, result) {
    if (err) {
      res.send(restifyHelper.httpError(err));
    } else {
      res.send(201, result);
    }
    return next();
  });
};

devicesController.getAll = function(req, res, next) {
  devicesBusiness.getAll(req, function(err, result) {
    if (err) {
      res.send(restifyHelper.httpError(err));
    } else {
      res.send(200, result);
    }
    return next();
  });
};

devicesController.changeStatus = function(req, res, next) {
  devicesBusiness.changeStatus(req, function(err, result) {
    if (err) {
      res.send(restifyHelper.httpError(err));
    } else {
      res.send(204);
    }
    return next();
  });
};

devicesController.availablePorts = function(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  var dataReques = {
    token: token,
    address: req.params.address
  };

  devicesBusiness.availablePorts(dataReques, function(err, result) {
    if (err) {
      res.send(restifyHelper.httpError(err));
    } else {
      res.send(200, result);
    }
    return next();
  });
};

devicesController.routes = [
  {
    route: "/",
    method: "post",
    action: "create"
  },
  {
    route: "/",
    method: "get",
    action: "getAll"
  },
  {
    route: "/:deviceId",
    method: "put",
    action: "changeStatus"
  },
  {
    route: "/available",
    method: "get",
    action: "availablePorts"
  }
];

module.exports = devicesController;
