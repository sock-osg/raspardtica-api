'use strict';
var winston = require('winston');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.DailyRotateFile({
      timestamp: true,
      level: 'debug',
      datePattern: '.yyyy-MM-dd.log',
      filename: './log/raspardtica-api',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true,
      stderrLevels:['error', 'debug', 'info']
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};
