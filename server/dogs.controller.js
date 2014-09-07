// Using Rails-like standard naming convention for endpoints.
// http://edgeguides.rubyonrails.org/routing.html#crud-verbs-and-actions
// GET     /workflows              ->  index
// POST    /workflows              ->  create
// GET     /workflows/:id          ->  show
// PUT     /workflows/:id          ->  update
// DELETE  /workflows/:id          ->  destroy

'use strict';

var Dog = require('./dog.model');

var DogsController = {};

DogsController.index = function(req, res, next) {
  next({ status: 500 });
};

DogsController.show = function(req, res, next) {
  next({ status: 500 });
};

DogsController.create = function(req, res, next) {
  next({ status: 500 });
};

DogsController.update = function(req, res, next) {
  next({ status: 500 });
};

DogsController.destroy = function(req, res, next) {
  next({ status: 500 });
};

module.exports = DogsController;