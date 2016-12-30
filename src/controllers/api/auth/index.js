'use strict';
var authBusiness = require('../../../business/auth'),
    restifyHelper = require('../../../helpers/restify')
;

var authController = {};

authController.authenticate = function(req, res, next) {
  authBusiness.authenticate(req.body, function(error, result) {
    if (error) {
      res.send(restifyHelper.httpError(error));
    } else {
      res.send(200, result);
    }

    return next();
  });
};

authController.routes = [
  {
    route: '/',
    method: 'post',
    action: 'authenticate'
  }
];

module.exports = authController;
