'use strict';

var OSI = require('../../index.js');

class TestService extends OSI.AService {
    constructor () {
        super();
    }

    run () {
        return 'test response';
    }
}

module.exports = TestService;