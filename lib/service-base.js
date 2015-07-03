//
// OSI.Service
//
// An abstract class that defines a service that can be registered
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

var _ = require('lodash');
var serviceProvider = require('./service-provider');

function Service () {
    Service.init.call(this);
}

module.exports = Service;



//
// The name with which this service is registered
//
Service.prototype._name = undefined;



//
// Initialize the service name
//
Service.init = function () {
    var self = this;

    if (_.isUndefined(this._name) || this._name === Object.getPrototypeOf(this)._name) {
        this.setName("_UndefinedService_");
    }
};

//
// Define the current service name
//
Service.prototype.setName = function (name) {
    this._name = name;
};

//
// Retrieving current service name
//
Service.prototype.getName = function () {
    return this._name;
};

//
// Abstract function that should be overriden
//
Service.prototype.run = function () {
};
