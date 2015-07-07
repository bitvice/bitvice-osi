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
        var testVar;
        var expectedVar = 10;
        var srvName = "TestService";
        var fnResolver = function () {
            testVar = expectedVar;
        };

        expect(OSI.requestService).to.be.a('function');

        OSI.requestService(srvName, fnResolver);

        should.not.exist(testVar);

        OSI.registerService(srvName, function(){return {setName: function(){}}});

        expect(testVar).to.be.a('number', expectedVar);

      var s = OSI.service(srvName);
      should.exist(s.setName);
    });

    it ('Rejects undefined services', function() {
	should.Throw(function(){OSI.registerService('Test')}, Error);
	should.Throw(function(){OSI.registerService()}, Error);
    });
});
