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
    beta: {},
    prod: {},
  };

  Object.assign(config.beta, config.dev);
  Object.assign(config.prod, config.dev);

  //config.beta.cmd.script = 'remote';

  return config[process.env.NODE_ENV || 'dev'];
})();
