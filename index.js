//
// OSI
//
// Observer Services Injection
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

// Load OSI methods
var OSI = require('./lib/osi.mod');

// Define the consumer abstract class
OSI.AConsumer = require('./lib/abstracts/consumer.abstract');

// Define the service abstract class
OSI.AService  = require('./lib/abstracts/service.abstract');

// Export OSI object
module.exports = OSI;