'use strict';
var devicesController = {};

devicesController.getAll = function(req, res) {
  res.json({
    devices: [
      {
        id: 1,
        address: "0x00000a",
        alias: "Water engine",
        enabled: true
      },
      {
        id: 2,
        address: "0x00000b",
        alias: "Main Door",
        enabled: false
      }
    ]
  });
};

devicesController.routes = [
  {
    route: "/:username",
    method: "get",
    action: "getAll"
  }
];

module.exports = devicesController;
