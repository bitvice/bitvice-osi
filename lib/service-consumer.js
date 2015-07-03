//
// OSI.ServiceConsumer
//
// An abstract class that defines the common behavior of classes that depends on some specific services
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

var _ = require('lodash');
var osiServiceProvider = require('./service-provider');

function ServiceConsumer () {
    ServiceConsumer.init.call(this);
}

module.exports = ServiceConsumer;



// Stores the services it depends on
ServiceConsumer.prototype._requires = undefined;

// Store the services that are available at one moment
ServiceConsumer.prototype._servicesLoaded = undefined;



//
// Initialize the dependencies
//
ServiceConsumer.init = function () {
    var self = this;

    this._servicesLoaded = {};

    if (_.isUndefined(this._requires) || this._requires === Object.getPrototypeOf(this)._requires) {
        this._requires = [];
    }

    // Request the dependencies from the provider
    _.each(this._requires, function (serviceName) {
        osiServiceProvider.requestService(self, serviceName);
    });
};

//
// Retrieves the service registered with the specified name, if it exists
//
ServiceConsumer.prototype.service = function (serviceName) {
    return osiServiceProvider.service(serviceName);
};

//
// Receive the requested dependency
//
ServiceConsumer.prototype.injectService = function (service) {
    this._servicesLoaded[service.getName()] = null;

    // Test if all the dependencies are available
    if (_.keys(this._servicesLoaded).length === this._requires.length) {
        // Execute the constructor method only when all the dependencies are available
        this.__constructor.call(this);
    }
};

//
// Abstract method that uses the services
//
ServiceConsumer.prototype.__constructor = function () {
    _.each(this._requires, function (serviceName) {
        var service = osiServiceProvider.service(serviceName);

        if (!_.isUndefined(service)) {
            service.run();
        }
    });    
};
