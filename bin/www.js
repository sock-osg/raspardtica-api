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
        title: 'OZ Raspardtica API',
        version: '1.0'
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
    console.log('listening at port ' + config.port);
  });

  console.log("\nRegistered routes:");
  for (var index = 0; index < server._router.stack.length; index++) {
    var layer = server._router.stack[index];

    if (layer.route === undefined) {
      continue;
    }
    console.log("\t" + layer.route.path);
  }
});

module.exports = server;
