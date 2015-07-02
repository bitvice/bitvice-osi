var _ = require('lodash');
var debug = require('debug')('bitvice:service-provider');

var exports = module.exports;

var servicesCache = {};
var dependencies = {};

exports.requestService = function (who, what) {
    if (!_.isUndefined(servicesCache[what])) {
        who.injectService(servicesCache[what]);
        return;
    }

    if (!_.has(dependencies, what)) {
        dependencies[what] = [];
    }

    dependencies[what].push(who);
};

exports.registerService = function (serviceName, serviceClass) {
    debug ("Register service '" + serviceName + "'.");

    var serviceInstance = new serviceClass();
    serviceInstance.setName(serviceName);

    servicesCache[serviceName] = serviceInstance;

    if (!_.has(dependencies, serviceName)) {
        _.each(dependencies[serviceName], function (consumer) {
            consumer.injectService(serviceInstance);
        });
    }
};

exports.service = function (serviceName) {
    return servicesCache[serviceName];
};