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

    // If the error is a Mongoose CastError, and the path
    // is the _id, the client sent an invalid ID when
    // addressing a single resource.
    // Return a 404.
    if(err.name === 'CastError' && err.path === '_id') {
      return res.status(404).json({
        message: 'Not Found'
      });
    }

    // If the error is a Mongoose ValidationError,
    // the client sent invalid data when trying to
    // create or update a document.
    // Return a 400.
    if(err.name === 'ValidationError') {
      return res.status(400).json(err.errors);
    }

    // Otherwise, fallback to an Internal Server Error.
    res.status(500).json({
      message: 'Internal Server Error'
    });
  });
};