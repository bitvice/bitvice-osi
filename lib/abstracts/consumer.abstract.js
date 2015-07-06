//
// OSI.AConsumer
//
// An abstract class that defines the behavior of a service consumer
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

'use strict';

var IConsumer = require('../interfaces/consumer.interface');
var osi = require('../../index');

class AConsumer extends IConsumer {

	constructor (dependencies) {
		super();

		if (typeof(dependencies) === 'undefined') {
			this._requires = [];
			return;
		}

		this._requires = dependencies;
		this._servicesLoaded = {};		

		var self = this;

    // Request the dependencies from the provider
    this._requires.forEach(function (serviceName) {
        osi.requestService(self, serviceName);
    });
	}

}

module.exports = AConsumer