const assert = require('assert');
const customMiddlewares = require('../custom-middlewares');

module.exports = {
    'Post Format Middleware Should Throw Exception if null Gets Passed in' : function(test) {
        try {
            customMiddlewares.resultParser(null);
        } catch (e) {
            test.ok(true);
        }
        test.done();
    },
    'Gateway Middleware' : function(test) {
        try {
            customMiddlewares.gatewayMiddleware({}, {}, function(){
                test.ok(true);
            })
        } catch (e){
            test.ok(false);
        }
        test.done();
    }
};