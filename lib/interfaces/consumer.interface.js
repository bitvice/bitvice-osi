//
// IConsumer
//
// Defines the structure of a service consumer class
//
// Copyright(c) 2015 Gabriel Balasz <gabi@bitvice.ro>
// MIT Licensed
//

'use strict';

class IConsumer {
	
	injectService (service) {}

	rejectService (service) {}

  ready () {}

}

module.exports = IConsumer;