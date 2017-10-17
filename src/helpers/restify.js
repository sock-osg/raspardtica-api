'use strict';
var restify = require('restify');
var appError = require('./appErrors');
var Logger = require('./logger')

/** @exports restifyHelper **/
var restifyHelper = {};

/*
*/
restifyHelper.httpError = function(err) {
  var httpError;
  if (err === appError.loginUserError) {
    httpError = new restify.errors.InvalidCredentialsError(err);
  } else if (err === appError.authTokenError
        || err === appError.badRequestError) {
    httpError = new restify.errors.BadRequestError(err);
  } else {
    Logger.error(err);
    httpError = new restify.errors.InternalServerError(err);
  }

  return httpError;
};

restifyHelper.formatters = {
  /**
   * JSON formatter.
   * @param    {Object} req  the request object
   * @param    {Object} res  the response object
   * @param    {Object} body response body
   * @param    {Function} cb callback
   * @returns  {String}
   */
  'application/json': function (req, res, body, cb) {
    if (body instanceof Error) {
      // snoop for RestError or HttpError, but don't rely on
      // instanceof
      res.statusCode = body.statusCode || 500;

      if (body.body) {
        body = body.body;
      } else {
        body = {
          code: body.code || body.name,
          message: body.message
        };
      }
    } else if (Buffer.isBuffer(body)) {
      body = body.toString('base64');
    }

    var data = JSON.stringify(body);
    res.setHeader('Content-Length', Buffer.byteLength(data));

    return cb(null, data);
  }
};

// Lets try and fix CORS support
// By default the restify middleware doesn't do much unless you instruct
// it to allow the correct headers.
//
// See issues:
// https://github.com/mcavage/node-restify/issues/284 (closed)
// https://github.com/mcavage/node-restify/issues/664 (unresolved)
//
// What it boils down to is that each client framework uses different headers
// and you have to enable the ones by hand that you may need.
// The authorization one is key for our authentication strategy
//
restify.CORS.ALLOW_HEADERS.push( "authorization"        );
restify.CORS.ALLOW_HEADERS.push( "withcredentials"      );
restify.CORS.ALLOW_HEADERS.push( "x-requested-with"     );
restify.CORS.ALLOW_HEADERS.push( "x-forwarded-for"      );
restify.CORS.ALLOW_HEADERS.push( "x-real-ip"            );
restify.CORS.ALLOW_HEADERS.push( "x-customheader"       );
restify.CORS.ALLOW_HEADERS.push( "user-agent"           );
restify.CORS.ALLOW_HEADERS.push( "keep-alive"           );
restify.CORS.ALLOW_HEADERS.push( "host"                 );
restify.CORS.ALLOW_HEADERS.push( "accept"               );
restify.CORS.ALLOW_HEADERS.push( "connection"           );
restify.CORS.ALLOW_HEADERS.push( "upgrade"              );
restify.CORS.ALLOW_HEADERS.push( "content-type"         );
restify.CORS.ALLOW_HEADERS.push( "dnt"                  ); // Do not track
restify.CORS.ALLOW_HEADERS.push( "if-modified-since"    );
restify.CORS.ALLOW_HEADERS.push( "cache-control"        );

module.exports = restifyHelper;
