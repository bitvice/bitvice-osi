//
// OSI
//
// Observer Services Injection
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

'use strict';

var consumer = require('./lib/service-consumer');
var provider = require('./lib/service-provider');
var AService  = require('./lib/abstracts/service.abstract');

var osi = module.exports;

osi.ServiceConsumer = consumer ;
osi.AService        = AService  ;

// TODO: Move ServiceProvider here
// TODO: Can we use promises ? Think so :)

