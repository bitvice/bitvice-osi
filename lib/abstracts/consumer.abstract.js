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
var osi = require('../osi.mod');

class AConsumer extends IConsumer {

	constructor (dependencies) {
		super();

		if (typeof(dependencies) === 'undefined') {
			this._requires = [];
			return;
		}

		this._requires = dependencies;
		this._servicesLoaded = {};		
        this._promises = [];

		var self = this;
        // Request the dependencies from the provider
        this._requires.forEach(function (serviceName) {
            var servicePromise = new Promise(function (resolve, reject) {
                osi.requestService(serviceName, resolve, reject);
            });

            servicePromise.then(self.injectService);
          
            self._promises.push(servicePromise);

        });

        Promise.all(this._promises).then(this.ready);
	}

    injectService (service) {
        console.log("Service injected " + service);
    }
}

module.exports = AConsumer;