//
// OSI
//
// Observer Services Injection
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

'use strict';

// var consumer = require('./lib/service-consumer');

var OSI = module.exports;

// Stores the list of registered services
var servicesCache = new WeakSet();

// Stores the list of classes that waits for services to be registered
var dependencies = new WeakMap();

//
// Generate a object containing the provided service name, to use in weak maps
//
function serviceObject (serviceName) {
    return {servoce: serviceName};
}



//
// Register a class (who) to be notified when a specific service (what) will be available
// TODO: Establish when to use fnReject
//
OSI.requestService = function (serviceName, fnResolve, fnReject) {

    var objService = serviceObject(serviceName);

    if (servicesCache.has(serviceName)) {
        fnResolve(servicesCache.get(serviceName));
        return;
    }

    if (!dependencies.has(serviceName)) {
        dependencies.set(objService, new Set());
    }

    dependencies.get(objService) . 
        add({resolve:fnResolve, reject: fnReject});
};

//
// Receive a service and notify the consumers about it's existence
//
OSI.registerService = function (serviceName, serviceClass) {
    var objService = serviceObject(serviceName);
    var serviceInstance = new serviceClass();
    serviceInstance.setName(serviceName);

    servicesCache.set(objService, serviceInstance);

    if (dependencies.has(objService)) {
        dependencies.get(objService) . 
            each (function (consumer) {
                consumer.resolve(serviceInstance);
            });
    }
};

//
// Retrieves the service instance for a spcific service name, it it exists
//
OSI.service = function (serviceName) {
    return servicesCache.get(serviceObject(serviceName));
};



OSI.AConsumer = require('./lib/abstracts/consumer.abstract');

OSI.AService  = require('./lib/abstracts/service.abstract');
