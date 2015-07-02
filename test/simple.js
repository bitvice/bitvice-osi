var util    = require('util');
var chai    = require('chai'), 
    expect  = chai.expect, 
    should  = chai.should();
var OSI     = require('../index.js');
var debug = require('debug')('bitvice:test');
 
describe('OSI', function(){

    describe('Service', function(){
        it('Should be able to use the Service.', function(){
            expect(OSI.Service).to.be.a('function');
        });
    });

    describe('ServiceConsumer', function(){
        it('Should be able to use the ServiceConsumer.', function(){
            expect(OSI.ServiceConsumer).to.be.a('function');
        });
    });

    describe('ServiceProvider', function(){
        it('Should be able to use the ServiceProvider.', function(){
            expect(OSI.ServiceProvider).to.be.a('object');
        });
    });

    it('Should set the right value', function () {
        var response;
        var expected = 100;

        // Define the consumer first

        function TestConsumer () {
            this._requires = ['basicService', 'secondService'];
            OSI.ServiceConsumer.call(this);
        }

        util.inherits(TestConsumer, OSI.ServiceConsumer);

        TestConsumer.prototype.__constructor = function () {
            debug('TestConsumer __constructor');

            var basicService  = this.service('basicService' );
            var secondService = this.service('secondService');

            response = basicService.run() * secondService.run();
        };

        var consumerInstance = new TestConsumer();



        // Define the basic service here

        function BasicService () {
            OSI.Service.call(this);
        }

        util.inherits(BasicService, OSI.Service);

        BasicService.prototype.run = function () {
            return 25;
        };

        OSI.ServiceProvider.registerService('basicService', BasicService);


        // test
        should.not.exist(response);



        // Define the second service here

        function SecondService () {
            OSI.Service.call(this);
        }

        util.inherits(SecondService, OSI.Service);

        SecondService.prototype.run = function () {
            return 4;
        };

        OSI.ServiceProvider.registerService('secondService', SecondService);



        // test
        expect(response).to.be.a('number', 100);
    });
});