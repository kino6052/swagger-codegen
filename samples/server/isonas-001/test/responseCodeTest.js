'use strict';

const assert = require('assert');
const customMiddlewares = require('../custom-middlewares');

module.exports = {

    'Request Context' : function(test) {
        try {
            customMiddlewares.gatewayMiddleware({}, {}, function(){
                test.ok(true);
            })
        } catch (e){
            test.ok(false);
        }
        test.done();
    },
    'Error Response' : function(test) {
        try {
            customMiddlewares.gatewayMiddleware({}, {}, function(){
                test.ok(true);
            })
        } catch (e){
            test.ok(false);
        }
        test.done();
    },
    'Response' : function(test) {
        try {
            let response = customMiddlewares.Response(
                {},
                {}
            );
        } catch (e){
            test.ok(false);
        }
        test.done();
    },
    'Request Chain' : function(test) {
        try {
            customMiddlewares.gatewayMiddleware({}, {}, function(){
                test.ok(true);
            })
        } catch (e){
            test.ok(false);
        }
        test.done();
    },
    'Resource Converter' : function(test) {
        try {
            let resourceConverter = customMiddlewares.ResourceConverter({}, {}, {});
            test.ok(resourceConverter.prune());
            test.
        } catch (e) {
            test.ok(false);
        }
        test.done();
    },
};