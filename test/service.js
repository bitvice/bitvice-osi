'use strict';

var util    = require('util');
var chai    = require('chai'), 
    expect  = chai.expect, 
    should  = chai.should();
var OSI     = require('../index.js');
 
describe('OSI', function(){

    describe('Service', function(){
        it('Can use the OSI.AService.', function(){
            expect(OSI.AService).to.be.a('function');
        });

        it('Service changed test value via "run" method.', function () {
            var test = 0;

            class BasicService extends OSI.AService {
                constructor (serviceName) {
                    super(serviceName);
                }

                run () {
                    test = 5;
                }
            }

            var s = new BasicService ("BASIC.SVC");

            s.run();

            expect(test).to.be.a('number', 5);

        });
    });

});



