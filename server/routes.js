'use strict';

var passport = require('passport'),
    DogsController = require('./dogs.controller');

module.exports = function(app) {
  /*app.route('/api/*')
     .all(passport.authenticate('basic', { session : false }));*/

  app.route('/api/dogs')
     .get(DogsController.index)
     .post(DogsController.create);

  app.route('/api/dogs/:id')
     .get(DogsController.show)
     .put(DogsController.update)
     .delete(DogsController.destroy);

  app.route('*')
     .all(function(req, res) {
       res.status(404).end();
     });
};

