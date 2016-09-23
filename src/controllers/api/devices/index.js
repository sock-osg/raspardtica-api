'use strict';
var devicesController = {};

devicesController.getAll = {
  config: {
    route: "/:username",
    method: "get"
  },
  _function: function(req, res) {
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
  }
}

module.exports = devicesController;
