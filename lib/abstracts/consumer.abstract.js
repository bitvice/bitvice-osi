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
var OSI = require('../osi.mod');

class AConsumer extends IConsumer {

    //
    // Specify the dependencies a a parameter
    //
    // Example:
    //      class Consumer extends OSI.AConsumer {}
    //      var consumer = new Consumer(["SERVICE1", "SERVICE2"]);
    //
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
        this._requires .
            forEach(function (serviceName) {

                var servicePromise = new Promise(function (resolve, reject) {

                    OSI.requestService(serviceName, resolve, reject);
                });

                servicePromise . then(self.injectService);
              
                self._promises
                    .push(servicePromise);

            });

        Promise .
            all(this._promises) . 
            then(this.ready) .
            catch(self.rejectService);
	}

    //
    // Actions to perform with the new available service
    //
    injectService (service) {

        console.log("Service injected " + service.name);
    }

    //
    // Notification that the requested service is not available
    //
    rejectService (serviceName) {

        console.log("Service '" + serviceName + "' is not not available");
    }    
}

module.exports = AConsumer;
