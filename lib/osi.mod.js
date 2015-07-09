//
// OSI
//
// Observer Services Injection
// http://www.es6fiddle.net/ibtbbllg/
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

'use strict';

var OSI = module.exports;



// Stores the list of registered services
var wmCache = new WeakMap();

// Stores the list of classes that waits for services to be registered
var wmDependencies = new WeakMap();

// List of service objects used as a key in WeakMaps
var mServices = new Map();



//
// Generate a object containing the provided service name, to use in weak maps
//
function serviceObject (serviceName) {
    
    if (!mServices.has(serviceName)) {
        mServices.set(serviceName, {
            name: serviceName
        });
    }
    return mServices.get(serviceName);
}


    
//
// Register a class to be notified when a specific service will be available
// TODO: Establish when to use fnReject
//
OSI.requestService = function (serviceName, fnResolve, fnReject) {
    
    if (typeof(serviceName) === 'undefined' || serviceName === '') {
      throw new Error('Service name is undefined.');
    }
    
    var objService = serviceObject(serviceName);

    if (wmCache.has(objService)) {
        fnResolve(OSI.service(serviceName));
        return;
    }

    if (!wmDependencies.has(objService)) {
        wmDependencies.set(objService, new Set());
    }

    wmDependencies . 
        get(objService) . 
        add({resolve:fnResolve, reject: fnReject});
};

//
// Receive a service and notify the consumers about it's existence
//
OSI.registerService = function (serviceName, serviceClass) {
    
    if (typeof(serviceName) === 'undefined' || serviceName === '') {
      throw new Error('Service name is undefined.');
    }

    var objService = serviceObject(serviceName);
    var currentService;

    if (typeof(serviceClass) != 'undefined') {
        currentService = new serviceClass();
        currentService.name = serviceName;
    } else {
	throw new Error('Service class is undefined.');
    }

    wmCache.set(objService, currentService);

    if (wmDependencies.has(objService)) {
        wmDependencies . 
            get(objService) . 
            forEach (function (consumer) {
                // Resolve the consumer's promise 
                // as the requested service has just registered
                consumer.resolve(currentService);
            });
    }
};

//
// Retrieves the service instance for a spcific service name, it it exists
//
OSI.service = function (serviceName) {
    
    return wmCache.get(serviceObject(serviceName));
};

//
// There are no more services to register
//
OSI.completeRegistration = function () {

    mServices.forEach(function (objService) {
        if (!wmCache.has(objService)) {
            // Found a service requested but not provided
            wmDependencies.get(objService) . 
                forEach (function (consumer) {
                    // Consumer's promise is rejected 
                    // as the requested service is not registered
                    consumer.reject();
                });
        }
    });

    // Dispose all service objects, 
    // should clear the WakMaps also (this is the beauty of it)
    mServices.clear();
}