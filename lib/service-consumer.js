var _ = require('lodash');
var debug = require('debug')('bitvice:service-consumer');
var serviceProvider = require('./service-provider');

function ServiceConsumer () {
    ServiceConsumer.init.call(this);
}

module.exports = ServiceConsumer;

ServiceConsumer.prototype._requires = undefined;
ServiceConsumer.prototype._servicesLoaded = undefined;

ServiceConsumer.init = function () {
    var self = this;

    this._servicesLoaded = {};

    if (_.isUndefined(this._requires) || this._requires === Object.getPrototypeOf(this)._requires) {
        this._requires = [];
    }

    if (this._requires.length > 0) {
        _.each(this._requires, function (serviceName) {
            serviceProvider.requestService(self, serviceName);
        });
    }
};

ServiceConsumer.prototype.list = function () {
    debug(this._requires);
};

ServiceConsumer.prototype.service = function (serviceName) {
    return serviceProvider.service(serviceName);
};

ServiceConsumer.prototype.injectService = function (service) {
    debug("InjectService '" + service.getName() + "'.");
    this._servicesLoaded[service.getName()] = null; // ??? = service;

    debug(_.keys(this._servicesLoaded).length + " | " + this._requires.length);

    if (_.keys(this._servicesLoaded).length === this._requires.length) {
        this.__constructor.call(this);
    }
};

ServiceConsumer.prototype.__constructor = function () {
    debug("Method called when all required services exists.");
};