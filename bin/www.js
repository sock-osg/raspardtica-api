var config = require('../config');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var server = express();

var routes = require('../src/routes')(server);

// Middlewares
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

  console.log("\nRegistered routes:");
  for (var index = 0; index < server._router.stack.length; index++) {
    var layer = server._router.stack[index];

    if (layer.route === undefined) {
      continue;
    }
    console.log("\t" + layer.route.stack[0].method + "\t -> " + layer.route.path);
  };

  mongoose.connect(config.mongodb, function (err) {
    if (err) {
      throw err;
    }
    console.log('Successfully connected to MongoDB');
  });

  server.initialized = true;
  server.listen(config.port, function () {
    console.log('listening at port ' + config.port);
  });
});

module.exports = server;
