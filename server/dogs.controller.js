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
  var query = Dog.find();

  // Filtering
  if(req.query.breed) {
    query.where('breed').equals(req.query.breed);
  }

  // Sorting
  if(req.query.sort) {
    query.sort(req.query.sort);
  }

  // Pagination
  if(req.query.offset) {
    query.skip(req.query.offset);
  }
  if(req.query.limit) {
    query.limit(req.query.limit);
  }

  return query.exec(function(err, dogs) {
    if(err) { return next(err); }

    return res.status(200).json(dogs);
  });
};

DogsController.show = function(req, res, next) {
  return Dog.findById(req.params.id, function(err, dog) {
    if(err) { return next(err); }
    if(!dog) { return next({ status: 404, body: 'Dog not found' }); }

    return res.status(200).json(dog);
  });
};

DogsController.create = function(req, res, next) {
  return Dog.create(req.body, function(err, dog) {
    if(err) { return next(err); }

    return res.status(201).json(dog);
  });
};

DogsController.update = function(req, res, next) {
  return Dog.findById(req.params.id, function(err, dog) {
    if(err) { return next(err); }
    if(!dog) { return next({ status: 404, body: 'Dog not found' }); }

    dog.set(req.body);
    dog.save(function(err) {
      if(err) { return next(err); }

      return res.status(200).json(dog);
    });
  });
};

DogsController.destroy = function(req, res, next) {
  return Dog.findByIdAndRemove(req.params.id, function(err, dog) {
    if(err) { return next(err); }
    if(!dog) { return next({ status: 404, body: 'Dog not found' }); }

    return res.status(204).end();
  });
};

module.exports = DogsController;