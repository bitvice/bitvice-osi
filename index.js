var util     = require('util');
var debug    = require('debug')('bitvice');

var consumer = require("./lib/service-consumer");
var provider = require('./lib/service-provider');
var service  = require('./lib/service-base'    );

var osi = module.exports;

osi.ServiceConsumer = consumer ;
osi.ServiceProvider = provider ;
osi.Service         = service  ;