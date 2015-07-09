'use strict';

var OSI = require('../../index.js');

class TestConsumer extends OSI.AConsumer {
    constructor (dependencies, value, reject) {
        super(dependencies);

        this.test = 0;
        this.tmp = value;
        this.reject = reject;
    }

    ready () {
        this.test = this.tmp;
    }

    getTest () {
        return this.test;
    }

    rejectService () {
        this.test = this.reject;
    }
}

module.exports = TestConsumer;