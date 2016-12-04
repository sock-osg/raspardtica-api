module.exports = (function () {
  'use strict';

  var config = {
    dev: {
      db: {
        storage: '/apps/oz/services/raspardtika/db',
        dialect: 'sqlite',
        pool: 10
      }
    },
    prod: {}
  };

  return config[process.env.NODE_ENV || 'dev'];
})();
