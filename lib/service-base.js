var _ = require('lodash');
var debug = require('debug')('bitvice:service');
var serviceProvider = require('./service-provider');

function Service () {
    Service.init.call(this);
}

module.exports = Service;

Service.prototype._name = undefined;

Service.init = function () {
    var self = this;
    debug ("Service base init.");

    if (_.isUndefined(this._name) || this._name === Object.getPrototypeOf(this)._name) {
        this._requires = "Undefined";
    }

    // serviceProvider.registerService(this);
};

Service.prototype.setName = function (name) {
    this._name = name;
};

Service.prototype.getName = function () {
    return this._name;
};

Service.prototype.run = function () {
    debug("Base execute method. Should be overriden.");
};
