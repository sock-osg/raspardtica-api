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
    action: 'create',
    validation: {
      content: {
        firstName: {
          isRequired: true,
          isString: true
        },
        lastName: {
          isRequired: true,
          isString: true
        },
        password: {
          isRequired: true,
          isString: true
        },
        email: {
          isRequired: true,
          isString: true,
          isEmail: true
        },
        twitter: {
          isRequired: true,
          isString: true,
          is: /^@.+$/i
        },
        userType: {
          isRequired: true,
          isString: true,
          isIn: ['MASTER', 'SLAVE']
        }
      }
    }
  }
];

module.exports = usersController;
