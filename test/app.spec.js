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
    it('should get a dog by ID', function(done) {
      agent
        .get('/api/dogs/' + dogIDs[0])
        .expect(200)
        .end(function(err, res) {
          expect(err).to.be(null);

          expect(res.body.name).to.be('Heinz');
          expect(res.body.breed).to.be('corgi');
          expect(res.body.dob).to.eql('2012-04-20T00:00:00.000Z');

          done();
        });
    });

    it('should return a 404 if the dog cannot be found', function(done) {
      agent
        .get('/api/dogs/' + ObjectId())
        .expect(404, done);
    });

    it('should return a 404 if the ID is invalid', function(done) {
      agent
        .get('/api/dogs/1')
        .expect(404, done);
    });
  });

  describe('Create', function() {
    it('should create a dog', function(done) {
      agent
        .post('/api/dogs')
        .send({ name: 'Manny', breed: 'spaniel', dob: '2011-10-12T00:00:00.000Z'})
        .set('Accept', 'application/json')
        .expect(201)
        .end(function(err, res) {
          expect(err).to.be(null);

          expect(res.body._id).to.be.ok();
          expect(res.body.name).to.be('Manny');
          expect(res.body.breed).to.be('spaniel');
          expect(res.body.dob).to.be('2011-10-12T00:00:00.000Z');

          done();
        });
    });

    describe('Validation', function() {
      it('should require a name', function(done) {
        agent
          .post('/api/dogs')
          .send({ breed: 'spaniel', dob: '2011-10-12T00:00:00.000Z'})
          .set('Accept', 'application/json')
          .expect(400, done);
      });

      it('should require a breed', function(done) {
        agent
          .post('/api/dogs')
          .send({ name: 'Manny', dob: '2011-10-12T00:00:00.000Z'})
          .set('Accept', 'application/json')
          .expect(400, done);
      });

      it('should fail if an invalid breed is specified', function(done) {
        agent
          .post('/api/dogs')
          .send({ name: 'Manny', breed: 'schnauser', dob: '2011-10-12T00:00:00.000Z'})
          .set('Accept', 'application/json')
          .expect(400, done);
      });

      it('should require a dob', function(done) {
        agent
          .post('/api/dogs')
          .send({ name: 'Manny', breed: 'spaniel' })
          .set('Accept', 'application/json')
          .expect(400, done);
      });
    });
  });

  describe('Update', function() {
    it('should update a dog', function(done) {
      agent
        .put('/api/dogs/' + dogIDs[0])
        .send({ name: 'Cooper' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          expect(err).to.be(null);

          expect(res.body._id).to.be.ok();
          expect(res.body.name).to.be('Cooper');
          expect(res.body.breed).to.be('corgi');
          expect(res.body.dob).to.be('2012-04-20T00:00:00.000Z');

          done();
        });
    });

    it('should return a 404 if the dog cannot be found', function(done) {
      agent
        .put('/api/dogs/' + ObjectId())
        .expect(404, done);
    });

    it('should return a 404 if the ID is invalid', function(done) {
      agent
        .put('/api/dogs/1')
        .expect(404, done);
    });

    describe('Validation', function() {
      it('should require a name', function(done) {
        agent
          .put('/api/dogs/' + dogIDs[0])
          .send({ name: '' })
          .set('Accept', 'application/json')
          .expect(400, done);
      });

      it('should require a breed', function(done) {
        agent
          .put('/api/dogs/' + dogIDs[0])
          .send({ breed: '' })
          .set('Accept', 'application/json')
          .expect(400, done);
      });

      it('should fail if an invalid breed is specified', function(done) {
        agent
          .put('/api/dogs/' + dogIDs[0])
          .send({ breed: 'schnauser' })
          .set('Accept', 'application/json')
          .expect(400, done);
      });

      it('should require a dob', function(done) {
        agent
          .put('/api/dogs/' + dogIDs[0])
          .send({ dob: '' })
          .set('Accept', 'application/json')
          .expect(400, done);
      });
    });
  });

  describe('Destroy', function() {
    it('should remove a dog');
    it('should return a 404 if the dog cannot be found');
    it('should return a 404 if the ID is invalid');
  });
});
