'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/no-rest-for-the-whippet');

// Setup express
var app = express();

// Setup body parser, which lets us parse JSON
// from the request body
app.use(bodyParser.json());

// Setup authentication
require('./server/auth')(app);

// Setup the app routes
require('./server/routes')(app);

// Setup the error handling
require('./server/errors')(app);

// And finally, start the app
app.listen(9000, function() {
  console.log('API running on port 9000');
});

module.exports = app;