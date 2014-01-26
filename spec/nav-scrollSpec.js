var $ = require("../node_modules/jasmine/jasmine-jquery.js");
var navScroll = require("../public/javascripts/nav-scroll.js");
var jsdom = require('jsdom'); 
var window = jsdom.jsdom().createWindow('<html><body></body></html>') 
document = window.document; 
//global.addEventListener = window.addEventListener } 

describe("Testing setup for nav-scroll.js - NOT real tests", function () {
    it("navScroll created", function(){ 
        expect(navScroll).not.toBe(null);  
    });
});