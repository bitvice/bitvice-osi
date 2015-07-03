var util    = require('util');
var chai    = require('chai'), 
    expect  = chai.expect, 
    should  = chai.should();
var OSI     = require('../index.js');
 
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

    describe('Consumers before, serivces after', function(){
        it('Consumers are waiting for services to become available', function () {
            var response;
            var expected = 100;

            // Define the consumer first

            var testDependencies = ['basicService', 'secondService'];

            function TestConsumer () {
                this._requires = testDependencies;
                OSI.ServiceConsumer.call(this);
            }

            util.inherits(TestConsumer, OSI.ServiceConsumer);

            TestConsumer.prototype.__constructor = function () {
                var basicService  = this.service('basicService' );
                var secondService = this.service('secondService');

                response = basicService.run() * secondService.run();
            };

            var consumerInstance = new TestConsumer();

            // test
            should.exist(consumerInstance);



            function Nonsense () {
                OSI.ServiceConsumer.call(this);            
            }

            util.inherits(Nonsense, OSI.ServiceConsumer);

            var nonsenseInstance = new Nonsense();

            // test
            should.exist(nonsenseInstance);

            // test
            should.exist(nonsenseInstance.__constructor);

            // test
            should.not.exist(nonsenseInstance.__constructor());




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



            function NonsenseService () {
                OSI.Service.call(this);            
            }

            util.inherits(NonsenseService, OSI.Service);

            OSI.ServiceProvider.registerService('nonsenseService', NonsenseService);

            var ns = OSI.ServiceProvider.service('nonsenseService');

            // test
            expect(ns.run).to.be.a('function');

            // test
            should.not.exist(ns.run());
            


            // test
            expect(response).to.be.a('number', expected);
        });

    });

    describe('Services before, Consumers after', function(){

        it('Consumer is runing the existing service', function () {

            var response;
            var expected = 100;
            var basicServiceName = 'basicService';

            // Define the basic service here

            function BasicService () {
                OSI.Service.call(this);
            }

            util.inherits(BasicService, OSI.Service);

            BasicService.prototype.run = function () {
                response = expected;
            };

            OSI.ServiceProvider.registerService(basicServiceName, BasicService);



            // Consumer

            var testDependencies = [basicServiceName];

            function TestConsumer () {
                this._requires = testDependencies;
                OSI.ServiceConsumer.call(this);
            }

            util.inherits(TestConsumer, OSI.ServiceConsumer);

            var consumerInstance = new TestConsumer();

            // test
            should.exist(consumerInstance);


            // test
            expect(response).to.be.a('number', expected);
        });
    });
});