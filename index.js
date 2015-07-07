//
// OSI
//
// Observer Services Injection
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

var OSI = require('./lib/osi.mod');

OSI.AConsumer = require('./lib/abstracts/consumer.abstract');

OSI.AService  = require('./lib/abstracts/service.abstract');

module.exports = OSI;