// A place where all error logic is handled.

'use strict';

module.exports = function(app) {

  app.use(function(err, req, res, next) {
    // If the error has a status code, send it
    // along with any extra information.
    if(err.status) {
      res.status(err.status);
      return err.body ? res.json(err.body) : res.end();
    }

    // Otherwise, fallback to an Internal Server Error.
    res.status(500).json({
      message: 'Internal Server Error'
    });
  });
};