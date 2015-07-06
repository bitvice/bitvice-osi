//
// OSI.AService
//
// An abstract class that defines a service that can be registered
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

'use strict';

var IService = require('../interfaces/service.interface');

class AService extends IService {

	constructor (serviceName) {
		super();

		if (typeof(serviceName) === 'undefined') {
			this._serviceName = AService.undefinedServiceName();
			return;
		}

		this._serviceName = serviceName;
	}

	set name(serviceName) {
		this._serviceName = serviceName;
	}

	get name() {
		return this._serviceName
	}

	static undefinedServiceName () {
		return '_UndefinedService_';
	}	

}

module.exports = AService