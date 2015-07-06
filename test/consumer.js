'use strict';

var util    = require('util');
var chai    = require('chai'), 
    expect  = chai.expect, 
    should  = chai.should();
var OSI     = require('../index.js');
 
// describe('OSI', function(){

//     describe('Service', function(){
//         it('Can use the OSI.AService.', function(){
//             expect(OSI.AService).to.be.a('function');
//         });

//         it('Service changed test value via "run" method.', function () {
//             var test = 0;

//             expect(test).to.be.a('number', 5);

//         });
//     });

// });

            class BasicConsumer extends OSI.AConsumer {
                constructor (dependencies) {
                    super(dependencies);
                }
            }

            var c = new BasicConsumer (["BASIC.SVC"]);

            console.log(c);
// use promise to register to services