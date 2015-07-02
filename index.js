var debug = require('debug')('bitvice');
var Class = require('bitvice-class');
var util = require('util');

var consumer = require("./lib/service-consumer");
var provider = require('./lib/service-provider');
var service  = require('./lib/service-base'    );

// var _ = require('lodash');

/*
function OSI () {
    OSI.init.call(this);
    // this.initialize2();
}

module.exports = OSI;

OSI.prototype._requires = undefined;

OSI.init = function () {
    debug ("OSI init");

    if (!this._requires || this._requires === Object.getPrototypeOf(this)._requires) {
        this._events = [];
    }
};
*/

var osi = module.exports;

osi.ServiceConsumer = consumer ;
osi.ServiceProvider = provider ;
osi.Service         = service  ;