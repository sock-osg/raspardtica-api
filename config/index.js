module.exports = (function () {
  'use strict';

  var config = {
    development: {
      port: 8080,
      mongodb: 'mongodb://localhost/bccertifications'
    },
    production: {}
  };

  return config[process.env.NODE_ENV || 'development'];
})();
