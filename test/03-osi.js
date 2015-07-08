'use strict';

var chai    = require('chai'), 
    expect  = chai.expect, 
    should  = chai.should();
var OSI     = require('../index.js');


describe('OSI Basic usage', function(){

    it('OSI is available', function () {
        expect(OSI).to.be.a('object');
    });

    it('OSI.registerService', function () {
        expect(OSI.registerService).to.be.a('function');
    });

    it('OSI.requestService', function () {

        var tmpVar;
        var expectedVar = 10;
        var srvName = "BASIC";

        var fnResolver = function () {
            tmpVar = expectedVar;
        };

        expect(OSI.requestService).to.be.a('function');

        OSI.requestService(srvName, fnResolver);

        should.not.exist(tmpVar);

        OSI.registerService(srvName, function(){return {setName: function(){}}; });

        expect(tmpVar).to.be.a('number', expectedVar);

        var s = OSI.service(srvName);
        should.exist(s.setName);
    });

    it ('Rejects undefined services', function() {
	   should.Throw(function(){OSI.registerService('Test')}, Error);
	   should.Throw(function(){OSI.registerService()}, Error);
    });

    it ('Rejects undefined service name for consumer', function() {
       should.Throw(function(){OSI.requestService()}, Error);
    });


    it('Service first, consumer after', function () {
        var testVar;
        var expectedVar = 10;
        var srvName = "TestService1";

        var TestService = require('./classes/test-service.class');

        OSI.registerService(srvName, TestService);

        var TestConsumer = require('./classes/test-consumer.class');

        

        var s = new TestConsumer([srvName], expectedVar);

        testVar = s.getTest();

        expect(testVar).to.be.a('number', expectedVar);
    });


    it('Consumer first, service after', function () {
        var testVar;
        var expectedVar = 10;
        var srvName = "TestService2";

        var TestConsumer = require('./classes/test-consumer.class');

        var s = new TestConsumer([srvName], expectedVar);

        testVar = s.getTest();

        expect(testVar).to.be.a('number', 0);

        var TestService = require('./classes/test-service.class');

        OSI.registerService(srvName, TestService);

        expect(testVar).to.be.a('number', expectedVar);
    });

});
