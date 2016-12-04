'use strict';
var restifyHelper = require('../../../helpers/restify'),
    models = require('../../../models'),
    userBusiness = require('../../../business/users');

var usersController = {};

usersController.create = function(req, res) {
  userBusiness.create(req.body, function(err, result) {
    if (err) {
      res.send(restifyHelper.httpError(err));
    } else {
      res.send(200, result);
    }
    return next();
  });
};

usersController.routes = [
  {
    route: '/create',
    method: 'post',
    action: 'create'
  }
];

module.exports = usersController;
