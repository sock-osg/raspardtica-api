module.exports = (function () {
  'use strict';

  var config = {
    dev: {
      server: {
        port: 8000
      },
      db: {
        storage: '/apps/oz/services/raspardtica/sqlite/raspardtica.sqlite',
        dialect: 'sqlite',
        pool: 10
      },
      jwt: {
        key: 'Q29suuGJCNmZ2g7h',
        algorithm: 'HS256',
        expiresIn: '2h'
      },
      cmd: {
        script: 'remote-mock'
      }
    },
    beta: {
    },
    prod: {
      jwt: {
        key: process.env.JWT_KEY,
        algorithm: 'HS256',
        expiresIn: '2h'
      }
    },
  };

  return Object.assign({}, config.dev, config[process.env.NODE_ENV || 'dev']);
})();
