var express = require('express');
//var router = express.Router();

module.exports = function(server) {
  'use strict';

  var dir = require('node-dir');
  var path = require('path');
  var util = require('util')


  /**
   * @exports routes
   */
  var routes = {
    /**
     * Generates the routes for every js file found in the directory
     * @param {string} directory - The directory to be searched
     * @param {Function} cb - A function to be called when all the files have been processed
     */
    generateRoutes : function(directory, cb) {
      if (typeof cb !== 'function') {
        throw new Error('Callback is required');
      }

      dir.files(directory, function(err, controllers) {
        if (err) {
          return cb(err);
        }
        for (var i = 0; i < controllers.length; i++) {
          try {
            var controller = require(controllers[i]);
            var relativePath = path.relative(__dirname, controllers[i]);
            var dirname = path.sep + path.dirname(relativePath.split(path.sep).slice(2).join(path.sep));
            console.log('Loading routes from: ' + controllers[i]);
            routes._createRoutes(controller, dirname);
          } catch (err) {
            return cb(err);
          }
        }
        return cb(null, controllers);
      });
    },
    /**
     * Creates a route from a controllers object
     * @param {Object} controller - The controllers to be added as a route
     * @param {string} path - The path for the new route
     * @private
     */
    _createRoutes: function(controller, path) {
      console.log(util.inspect(controller, {showHidden: false, depth: null}));

      controller = controller || {};
      controller.routes = controller.routes || [];
      path = path || '';
      for (var i = 0; i < controller.length; i++) {
        console.log("Setting " + controller[i]);
        var controllerConfig = controller[i].config;
        server[controllerConfig.method]({url: path + controllerConfig.route, validation: controllerConfig.validation}, controller[i]._function);
      }
    }
  };
  return routes;
};
