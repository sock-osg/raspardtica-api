'use strict';

var devicesController = {};

devicesController.create = function(req, res) {

};

devicesController.routes = [
  {
    route: "/create/:username",
    method: "post",
    action: "create"
  }
];

module.exports = devicesController;
