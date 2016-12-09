module.exports = (function () {
  'use strict';

  var config = {
    dev: {
      server: {
        port: 8000
      },
      db: {
        storage: '/apps/oz/services/raspardtika/db/raspardica.sqlite',
        dialect: 'sqlite',
        pool: 10
      }
    },
    prod: {}
  };

  return config[process.env.NODE_ENV || 'dev'];
})();
