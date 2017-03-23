'use strict';
var appError = require('./appErrors');
var config = require('../../config');
var jwt    = require('jsonwebtoken');
var logger = require('./logger');
var acls = require('./acls.js');

var authFilter = {};

function validateAuthorization(token, url, method, cb) {
  logger.info("## Validating token: " + token);

  jwt.verify(token, config.jwt.key, function(err, decoded) {
    if (err) {
      logger.error(new Error(err));
      cb(appError.authTokenError, null);
    }
    acls.validateAcls(decoded.role, url, [method], function (err, result) {
      if (err || result === false) {
        cb(appError.authTokenError, null);
      } else {
        cb(null, true);
      }
    });
  });
}

authFilter.authorization = function(req, cb) {
  var token = null;
  try {
    var url = req.url;
    var method = req.method;
    if (req.headers.authorization) {
      token = req.headers.authorization;

      validateAuthorization(token, url, method,function(err, result) {
        if (err) {
          cb(appError.authTokenError, null);
        } else {
          cb(null, true);
        }
      });
    } else {
      acls.validateAcls('ROLE_ALL', url, [method], function(err, result) {
        if (err || result === false ) {
          if (err) {
            logger.error(new Error(err));
          }
          return cb(appError.authTokenError, null);
        } else {
          return cb(null, true);
        }
      });
    }
  } catch(err) {
    logger.error(err);
    cb(appError.authTokenError, null);
  }
};

module.exports = authFilter;
