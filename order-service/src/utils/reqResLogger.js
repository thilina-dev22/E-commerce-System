const logger = require('./logger');

module.exports = (req, res, next) => {
  logger.info('--> REQUEST: ' + req.method + ' ' + req.url + ' | Body: ' + JSON.stringify(req.body || {}));
  
  const originalSend = res.send;
  res.send = function (body) {
    if (typeof body === 'string') {
      logger.info('<-- RESPONSE: [' + res.statusCode + '] | Body: ' + body);
    } else {
      logger.info('<-- RESPONSE: [' + res.statusCode + '] | Body: ' + JSON.stringify(body));
    }
    return originalSend.call(this, body);
  };
  next();
};
