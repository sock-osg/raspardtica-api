'use strict';
var restifyHelper = require('../../../helpers/restify');
var devicesBusiness = require('./../../../business/devices');

var devicesController = {};

devicesController.create = function(req, res, next) {
  devicesBusiness.create(req, function(err, result) {
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
  }
];

module.exports = devicesController;
