'use strict';

var util    = require('util');
var chai    = require('chai'), 
    expect  = chai.expect, 
    should  = chai.should();
var OSI     = require('../index.js');
 
describe('OSI', function(){

    describe('Coonsumer', function(){
        it('Can use the OSI.AConsumer.', function(){
            expect(OSI.AConsumer).to.be.a('function');
        });

        it('Service changed test value via "run" method.', function () {
            var testVar;

            OSI.registerService('A', function () {return {setName: function(){}};});

            class BasicConsumer extends OSI.AConsumer {
                constructor (dependencies) {
                    super(dependencies);
                }

                ready () {
                    testVar = 100;
                }
            }

            var consumer = new BasicConsumer (['BASIC.SVC', 'A']);

            expect(consumer).to.be.a('object');

            should.not.exist(testVar);


            var status1 = consumer.status;
            expect(status1).to.be.a('string', 'pending');

        });       
    });
});
