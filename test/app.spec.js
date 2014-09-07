'use strict';

var request = require('supertest'),
    expect = require('expect.js'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Dog = require('../server/dog.model'),
    app = require('../server'),
    agent = request(app);

var dogIDs = [ ObjectId(), ObjectId() ];

var testData = [{
  _id: dogIDs[0],
  name: 'Heinz',
  breed: 'corgi',
  dob: '2012-04-20T00:00:00.000Z'
}, {
  _id: dogIDs[1],
  name: 'Fenton',
  breed: 'labrador',
  dob: '2010-08-06T00:00:00.000Z'
}];

describe('Dogs API Specs', function() {

  beforeEach(function(done) {
    // Seed the DB with some test data.
    Dog.remove(function() {
      Dog.create(testData, done);
    });
  });

  describe('Authentication', function() {
    it('should protect all API routes');
  });

  describe('Retrieve All', function() {
    it('should get all dogs', function(done) {
      agent
        .get('/api/dogs')
        .expect(200)
        .end(function(err, res) {
          expect(err).to.be(null);

          expect(res.body.length).to.be(2);

          expect(res.body[0].name).to.be('Heinz');
          expect(res.body[0].breed).to.be('corgi');
          expect(res.body[0].dob).to.eql('2012-04-20T00:00:00.000Z');

          expect(res.body[1].name).to.be('Fenton');
          expect(res.body[1].breed).to.be('labrador');
          expect(res.body[1].dob).to.eql('2010-08-06T00:00:00.000Z');

          done();
        });
    });

    it('should filter by breed');
    it('should sort by dob, oldest first');
    it('should paginate dogs');
  });

  describe('Retrieve One', function() {
    it('should get a dog by ID');
    it('should return a 404 if the dog cannot be found');
    it('should return a 404 if the ID is invalid');
  });

  describe('Create', function() {
    it('should create a dog');

    describe('Validation', function() {
      it('should require a name');
      it('should require a breed');
      it('should fail if an invalid breed is specified');
      it('should require a dob');
    });
  });

  describe('Update', function() {
    it('should update a dog');
    it('should return a 404 if the dog cannot be found');
    it('should return a 404 if the ID is invalid');

    describe('Validation', function() {
      it('should require a name');
      it('should require a breed');
      it('should fail if an invalid breed is specified');
      it('should require a dob');
    });
  });

  describe('Destroy', function() {
    it('should remove a dog');
    it('should return a 404 if the dog cannot be found');
    it('should return a 404 if the ID is invalid');
  });
});
