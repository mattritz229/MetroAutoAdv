var $ = require("../node_modules/jasmine/jasmine-jquery.js");
var navScroll = require("../public/javascripts/nav-scroll.js");


describe("Testing setup for nav-scroll.js - NOT real tests", function () {
    it("navScroll created", function(){ 
        expect(navScroll).not.toBe(null);  
    });
});