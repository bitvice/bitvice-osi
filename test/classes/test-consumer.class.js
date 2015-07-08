'use strict';

var OSI = require('../../index.js');

class TestConsumer extends OSI.AConsumer {
    constructor (dependencies, value) {
        super(dependencies);

        this.test = 0;
        this.tmp = value;
    }

    ready () {
        this.test = this.tmp;
    }

    getTest () {
        return this.test;
    }
}

module.exports = TestConsumer;