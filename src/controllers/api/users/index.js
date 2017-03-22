'use strict';
var restifyHelper = require('../../../helpers/restify'),
    models = require('../../../models'),
    userBusiness = require('../../../business/users');

var usersController = {};

usersController.create = function(req, res, next) {
  userBusiness.addUser(req.body, function(err, result) {
    if (err) {
      res.send(restifyHelper.httpError(err));
    } else {
      res.send(201, result);
    }
    return next();
  });
};

usersController.routes = [
  {
    route: '/',
    method: 'post',
    action: 'create'
  }
];

module.exports = usersController;
