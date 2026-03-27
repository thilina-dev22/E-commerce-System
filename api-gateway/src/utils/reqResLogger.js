const logger = require('./logger');

module.exports = (req, res, next) => {
  logger.info(`--> GATEWAY REQUEST : ${req.method} ${req.url}`);
  
  // Wait for the response to finish to capture the status
  res.on('finish', () => {
    logger.info(`<-- GATEWAY RESPONSE: [${res.statusCode}] ${req.method} ${req.url}`);
  });

  next();
};
