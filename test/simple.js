var expect = require("chai").expect;
var osi = require("../index.js");
 
describe("OSI", function(){

   it("Should contain 2 functions and one object.", function(){
       var results = {depth: 4, hello: "world"};

       expect(osi.Service).to.be.a("function");
       expect(osi.ServiceConsumer).to.be.a("function");
       expect(osi.ServiceProvider).to.be.a("object");
   });

});