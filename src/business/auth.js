'use strict';
var models = require('../models'),
    tools = require('../helpers/tools'),
    appError = require('../helpers/appErrors'),
    jwt    = require('jsonwebtoken'),
    config = require('../../config')
;

var authBusiness = {};

authBusiness.authenticate = function(data, cb) {
  models.users.findOne({where: {email: data.email}}).then(function(user) {
    if (user) {
      var password = tools.encryptPassword(data.password);

      if (user.password === password) {
        generateToken(user, function(error, response) {
          if (error) {
            return cb(error, null);
          } else {
            return cb(null, response);
          }
        });
      } else {
        return cb(appError.loginUserError, null);
      }
    } else {
      return cb(appError.loginUserError, null);
    }
  });
};

function generateToken(user, cb) {
  //use try catch because jwt.sign callback don't retrive the error
  try {
    var token = jwt.sign({
        user: user.email,
        role: 'ROLE_ALL',
        uuid: user.id,
      },
      config.jwt.key,
      {
        algorithm: config.jwt.algorithm,
        expiresIn: config.jwt.expiresIn
      });

    verifyToken(token, function(err, result){
      if (err) {
        return cb(err, null);
      }
      cb(null, {token: token, exp: result.exp});
    });
  } catch(err) {
    cb(appError.createAuthTokenError, null);
  }
}

function verifyToken(token, cb) {
  jwt.verify(token, config.jwt.key, function(err, decoded) {
    if (err) {
      return cb(appError.authTokenError, null);
    }
    cb(null, decoded);
  });
}

module.exports = authBusiness;
