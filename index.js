'use strict';

var consumer = require('./lib/service-consumer');
var provider = require('./lib/service-provider');
var AService  = require('./lib/abstracts/service.abstract');

var osi = module.exports;

osi.ServiceConsumer = consumer ;
osi.ServiceProvider = provider ;
osi.AService        = AService  ;

// TODO: Move ServiceProvider here
// TODO: Can we use promises ? Think so :)

