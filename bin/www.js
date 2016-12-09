'use strict';
var config = require('../config');
var restify = require('restify');
var Logger = new require('bunyan');
var restifyValidation = require('node-restify-validation');
var restifyHelper = require('../src/helpers/restify');
//var acls = require('../src/helpers/acls.js');

var server = restify.createServer({
  name: 'raspardtica-api',
  log: new Logger.createLogger({
    name: 'raspardtica-api',
    serializers: {
      req: Logger.stdSerializers.req
    }
  }),
  formatters: restifyHelper.formatters
});
var path = require('path');

var routes = require('../src/routes')(server);

var Sequelize = require('sequelize');
var sequelize = new Sequelize('raspardtica-db', null, null, {
    dialect: config.db.dialect,
    storage: config.db.storage,
    pool: config.db.pool,
    define: {
      timestamps: false
    }
});

// Middlewares
server.use(restify.bodyParser({mapParams: false}));
// Load Acls
//acls.loadAcls();

server.use(restify.queryParser());
server.use(restifyValidation.validationPlugin({errorHandler: restify.errors.InvalidArgumentError}));
server.pre(restify.CORS({origins: ['*'], headers: ['x-requested-with']}));
// CORS FIX *
// Manually implement the method not allowed handler to fix failing preflights
server.on("MethodNotAllowed", function(request, response) {
  if (request.method.toUpperCase() === "OPTIONS") {
    // Send the CORS headers
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Allow-Headers", restify.CORS.ALLOW_HEADERS.join(", "));
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    response.header("Access-Control-Allow-Origin", request.headers.origin);
    response.header("Access-Control-Max-Age", 0);
    response.header("Content-type", "text/plain charset=UTF-8");
    response.header("Content-length", 0);
    response.send(204);
  } else {
    response.send(new restify.MethodNotAllowedError());
  }
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
        title: 'Raspardtica API',
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
  server.listen(config.server.port, function () {
    console.log('listening at port ' + config.server.port);
  });

  sequelize.authenticate()
    .then(function(err) {
      console.log("Connection to database has been established successfully");
    })
    .catch(function(err) {
      console.log("Unable to connect to DataBase", err);
    });

  sequelize.sync({force: true});
});

module.exports = server;
