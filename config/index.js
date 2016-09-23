module.exports = (function () {
  'use strict';

  var config = {
    development: {
      port: 8080,
      mongodb: 'mongodb://localhost/bccertifications',
      uploadDir: __dirname + '/uploads/',
      network: 'testnet',
      wallet: {
        address: 'mpyruyDZcBJ2oMB4dGyhfBicEGjBxEUkGT',
        pKey: 'cQJxzMy9nvHThGuUqsqqAf1ZzrCfGze2orCcniAnUPdtky9qMNsd'
      },
      bitcored: 'http://localhost:3001',
      bitcoin_rpc: {
        protocol : 'http',
        user: 'bitcoinrpc',
        pass : 'GLQMan2yXN1GvSDkVo39bCK2sC26RkXpGCd8WrPGHeFZ',
        host: '10.28.149.235',
        port: '8332'
      }
    },
    production: {}
  };

  return config[process.env.NODE_ENV || 'development'];
})();
