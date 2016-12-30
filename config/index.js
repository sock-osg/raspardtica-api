module.exports = (function () {
  'use strict';

  var config = {
    dev: {
      server: {
        port: 8000
      },
      db: {
        storage: '/apps/oz/services/raspardtica/db/raspardica.sqlite',
        dialect: 'sqlite',
        pool: 10
      },
      jwt: {
        key: 'Q29suuGJCNmZ2g7h',
        algorithm: 'HS256',
        expiresIn: '2h'
      },
    },
    prod: {}
  };

  return config[process.env.NODE_ENV || 'dev'];
})();
