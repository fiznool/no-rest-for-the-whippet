'use strict';

var mongoose = require('mongoose');

var DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true,
    enum: ['corgi', 'labrador', 'spaniel']
  },
  dob: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Dog', DogSchema);