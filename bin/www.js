var config = require('../config');
var express = require('express');
var path = require('path');

var server = express();

var routes = require('../src/routes')(server);

routes.generateRoutes(path.resolve(__dirname + '/..') + '/src/controllers/', function (err, routes) {
  if (err) {
    throw err;
  }

  //Swagger
  var swaggerJSDoc = require('swagger-jsdoc');

  var swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Digital Assets',
        version: '1.0.0'
      },
      basePath: '/api',
      produces: ['application/json']
    },
    apis: routes
  };

  var swaggerSpec = swaggerJSDoc(swaggerOptions);

  server.get('/api-docs.json', function (req, res, next) {
    res.json(swaggerSpec);
  });

  server.initialized = true;

  server.listen(config.port, function () {
    console.log(server.name + ' listening at ' + server.url);
  });

  /*mongoose.connect(config.mongodb, function (err) {
    if (err) {
      throw err;
    }
    console.log('Successfully connected to MongoDB');
  });*/
});
/**
 * Default callback
 * @callback defaultCallback
 * @param {Error} error - The error object
 * @param {*} [data] - The data
 */

module.exports = server;
