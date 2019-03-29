/* Jannik */

const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/info.log'
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/errors.log'
    })
  ]
});

module.exports = logger;