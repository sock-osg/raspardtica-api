'use strict';
var logger = require('./logger');
var acl = require('acl');
var async =  require('async');
var appError = require('./appErrors');
// Or Using the memory backend
acl = new acl(new acl.memoryBackend());

var validatorUrl = {
	roles: {
		ROLE_ALL: [
      {resources:'/api/auth', regExp :'(/api/auth)'},
			{resources:'/api/devices', regExp :'(/api/devices)'},
			{resources:'/api/users', regExp :'(/api/users)'},
      {resources:'/favicon.ico', regExp :'(/favicon.ico)'},
    ],
  }
};

var aclsHelper = {};

aclsHelper.loadAcls = function (){
  acl.allow([
    {
      roles:['ROLE_ALL'],
      allows: [
        {resources:'/api/auth', permissions:['POST']},
				{resources:'/api/devices', permissions:['GET', 'POST', 'PUT']},
				{resources:'/api/users', permissions:['POST']},
        {resources:'/favicon.ico', permissions :['GET']},
      ]
    },
  ]);
};

aclsHelper.validateAcls = function(role, resource, permissions, cb) {
  var regex = null;
  var resources = null;

  if (permissions[0] === "OPTIONS") {
    cb(null, true);
    return;
  }

  async.forEachOf(validatorUrl.roles[role], function (value, key, callback) {
    regex = new RegExp(value.regExp, 'g');
    if (regex.test(resource)) {
      resources = value.resources;
    }
    callback();
  }, function (err) {
    if (err || resources === null) {
      if (err) {
        logger.error(new Error(err));
      }
      return cb(appError.urlInexistentError, null);
    }
    acl.areAnyRolesAllowed(role, resources, permissions, function(err, allowed){
      if (err) {
        logger.error(new Error(err));
        cb(appError.urlInexistentError, null);
      } else {
        if (!allowed) {
          logger.error(new Error(appError.urlInexistentError));
        }
        cb(null, allowed);
      }
    });
  });
};

module.exports = aclsHelper;
