'use strict';

const querystring     = require('querystring');
const http            = require('http');

// Authentication Middleware
module.exports.authenticationMiddleware = function authenticationMiddleware(req, res, next){
    try {
        let rc = new RequestContext(req);
        return new RequestChain(req).process([
            [
                {
                    hostname:   rc.getHostname(),
                    port:       rc.getPort(),
                    path:       "/login",
                    method:     "POST",
                    headers:    rc.getHeaders(),
                    write:      rc.getAuthorizationHeader()
                },
                function(data){
                    if (data.success) {
                        next();
                    } else {
                        ErrorResponse.send(
                            res,
                            new ErrorResponse(
                                {
                                    status  : 403,
                                    message : "Unauthenticated"
                                }
                            )
                        )
                    }
                }
            ]
        ]).catch(
            (e) => {
                ErrorResponse.send(
                    res,
                    new ErrorResponse(
                        {
                            status: 500,
                            message: e.message
                        }
                    )
                )
            }
        )
    } catch (e){
        ErrorResponse.send(
            res,
            new ErrorResponse(
                {
                    status  : 500,
                    message : e.message
                }
            )
        )
    }
};

// Gateway Middleware to Map Request Endpoints to Pure Access Endpoints
module.exports.gatewayMiddleware = function gatewayMiddleware(req, res, next){
    try {
        let rc = new RequestContext(req);
        return new RequestChain(req).process([
            [
                {
                    hostname    :   rc.getHostname(),
                    port        :   rc.getPort(),
                    path        :   "/getTenantForUser?" + rc.getAuthorizationHeader(),
                    method      :   "GET",
                    headers     :   rc.getHeaders(),
                },
                function(data){
                    return data;
                }
            ],
            [
                {
                    hostname    :   rc.getHostname(),
                    port        :   rc.getPort(),
                    method      :   rc.getIntegrationMethod(),
                    headers     :   rc.getHeaders(),
                    fn: function(data){ // Function for Processing Header Fields Based on the Returned Values from the Previous Request (/getTenantForUser)
                        const tenantId  = data.result.id;
                        this.write      = rc.getParams(tenantId);
                        this.path       = rc.getIntegrationPath();
                        switch (rc.getIntegrationMethod()){
                            case "GET":
                                this.path = rc.getIntegrationPath() + "?" + rc.getParams(tenantId);
                                break;
                        }
                        return data;
                    }
                },
                function(data) {
                    if (data.success) {
                        res.data = data;
                        next();
                    } else {
                        ErrorResponse.send(
                            res,
                            new ErrorResponse(
                                {
                                    status      : 500,
                                    message     : "Bad Result"
                                }
                            )
                        )
                    }
                    return data;
                }
            ]
        ])
            .catch(
                (e) => {
                    ErrorResponse.send(
                        res,
                        new ErrorResponse(
                            {
                                status: 500,
                                message: e.message
                            }
                        )
                    )
                }
            )
    } catch (e) {
        ErrorResponse.send(
            res,
            {
                status: 500,
                message: e.message
            }
        );
    }
};

// Parse the Result and Populate Fields
module.exports.postFormatMiddleware = function postFormatMiddleware(req, res){
    const requestChain  = new RequestChain(req);
    const isArray       = res.examples.constructor === Array; // TODO: Refactor for Better Readability
    let result          = res.data.result;

    let callback = function(resource){
        let model = isArray ? res.examples[0] : res.examples;
        return new ResourceConverter(resource, model, requestChain).postformat();
    };

    let finalCallback = function (data) {
        res.end(JSON.stringify(data));
    };

    try {
        // Array of Results
        if (isArray){
            processArray(result, callback)
                .then(finalCallback)
                .catch(
                    function(e){
                        ErrorResponse.send(res, e);
                    }
                );
        }
        // Single Result
        else {
            callback(result)
                .then(finalCallback)
                .catch(
                    function(e){
                        ErrorResponse.send(res, e);
                    }
                );
        }
    } catch (e) {
        ErrorResponse.send(res, e);
    }
};


///////////////////////////////////////
// Convenience Classes and Functions //
///////////////////////////////////////

class RequestContext {
    constructor(req){
        this.req                    = req;
        this.checkIfEndpointExists();
        this.integration            = req.swagger.operation["x-apigateway-integration"];
        this.port                   = this.integration.port;
        this.hostname               = this.integration.hostname;
        this.authorizationHeader    = RequestContext.processAuthorizationHeader(this.req.header("Authorization"));
        this.integrationMethod      = RequestContext.convertMethod(this.integration.httpMethod);
        this.integrationPath        = this.integration.path;
        this.params                 = this.req.swagger.params;
        this.headers                = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'username=api; utoken=manager;',
        };
    }

    checkIfEndpointExists(){
        if (!this.req.swagger){
            throw new Error("No Such Endpoint Defined in Specification");
        }
    }

    getPort(){
        return this.port;
    }

    getHostname(){
        return this.hostname;
    }

    static processAuthorizationHeader(header){
        let authorizationHeaderDecoded    = RequestContext.decodeBase64AuthenticationToken(header);
        return querystring.stringify(authorizationHeaderDecoded);
    }

    getAuthorizationHeader(){
        return this.authorizationHeader;
    }

    getIntegrationMethod(){
        return this.integrationMethod;
    }

    getIntegrationPath(){
        return this.integrationPath;
    }

    getParams(tenantId){
        let params = this.params;
        try {
            let result = {};
            let extra = "";
            Object.keys(params).forEach(function(param){
                result[param] = params[param].value;
                if (typeof result[param] === "object"){
                    extra += querystring.stringify(result[param]);
                    delete result[param];
                }
            });
            result.tenantId = tenantId;
            return querystring.stringify(result) + "&" + extra;
        } catch (e) {
            throw new Error(
                {
                    status  : 499,
                    message : "Couldn't Get Params"
                }
            );
        }
    }

    static convertMethod(method){
        switch (method){
            case "GET":
                return "GET";
            case "POST":
            case "PATCH":
            case "PUT":
                return "POST";
        }
    }

    getHeaders(){
        return this.headers;
    }

    static decodeBase64AuthenticationToken(b64String){
        try {
            const strippedString = b64String.replace("Basic", "").replace(" ", "");
            const decoded = new Buffer(strippedString, 'base64').toString();
            const username = decoded.replace(/:.+/, "");
            const password = decoded.replace(/.+:/, "");
            return {username: username, pwd: password};
        } catch (e) {
            return {username:"", pwd: ""}
        }
    }
};

class ErrorResponse {
    constructor(object){
        return new Error(
            JSON.stringify(object)
        )
    }
    static send(res, e){
        let error = null;
        try {
            error = JSON.parse(e.message);
        } catch(ex) {
            error = {
                message: e.message,
                status: 500
            };
        }
        res
            .status(error.status)
            .type('application/json')
            .send(
                error
            );
    }
};

class Response {
    constructor(response, options){
        this.response   = response;
        this.options    = options;
        this.body       = "";
        this.setEncoding();
        this.registerOnDataCallback();
        return this.registerOnEndCallback();
    }

    setEncoding(){
        try {
            let encoding = this.options.encoding;
            if (encoding){
                this.response.setEncoding(encoding);
            } else {
                this.response.setEncoding('utf8');
            }
        } catch (e) {
            throw new Error(
                JSON.stringify(
                    {
                        status: 499,
                        message: "Couldn't Set Encoding"
                    }
                )
            )
        }
    }

    registerOnDataCallback(){
        let self = this;
        this.response.on('data', (chunk) => {
            // console.log(`BODY: ${chunk}`);
            if (self.options.encoding === "binary"){
                self.body += Response.processBinary(chunk);
            } else {
                self.body += chunk;
            }
        });
    }

    registerOnEndCallback(){
        let self = this;
        return new Promise(
            function(resolve, reject){
                self.response.on('end', function(){
                    let result;
                    try {
                        if (self.options.encoding === "binary"){
                            if (
                                self.options.mimeType &&
                                self.options.mimeType === "image"
                            ){
                                result = self.processImage();
                            }
                        } else {
                            result = JSON.parse(self.body);
                        }
                    } catch (e) {
                        reject(e);
                    }
                    resolve(result);
                });
            }
        );
    }

    processImage(){
        let self = this;
        let fileExtension = self.response.headers['content-disposition'].replace(/.+\./, '');
        let b64String= new Buffer(self.body, 'hex').toString('base64');
        return "data:image/" + fileExtension + ";base64," + b64String;
    }

    static processBinary(chunk){
        return new Buffer(chunk, 'binary').toString('hex');
    }
};

// Throws Errors Specific to Requests and Responses
class RequestChain {
    constructor(req){
        this.timeout        = 20 * 1000;
        this.req            = req;
        this.integration    = req.swagger.operation["x-apigateway-integration"];
        this.rc             = new RequestContext(req);
    }

    //Sequential Promise Resolution
    process(requestArray){
        let self = this;
        return requestArray.reduce(
            function(promise, request){
                return promise.then(
                    function(result){
                        const options = request[0];
                        const callback = request[1];
                        if (options.hasOwnProperty("fn")) { // Function That Processes Options Object for the http.request
                            options.fn(result[result.length-1]);
                        }
                        return self.makeRequest(options)
                            .then(callback)
                            .then(
                                Array.prototype.concat.bind(result) // Process Data and Append it To List;
                            )
                    }
                );
            },
            Promise.resolve([])
        )
    }

    // Convenience Function to Make Requests to the Pure Access
    makeRequest(options) {
        let self = this;
        return new Promise(function(resolve, reject){
            const request = http.request(options, (response) => {
                new Response(response, options)
                    .catch(
                        function(e){
                            reject(e);
                        }
                    )
                    .then(
                        function(result) {
                            resolve(result);
                        }
                    );
            });
            request.on('error', (e) => {
                console.error(`Problem with Request: ${e.message}`);
                reject(e);
            });
            if (options.write){
                request.write(options.write)
            }
            setTimeout(
                () => {
                    reject(new Error("Request Timeout"));
                },
                self.timeout
            );
            request.end();
        })
    }

    getImage(profileId){
        return this.makeRequest(
            {
                hostname:   this.rc.getHostname(),
                port:       this.rc.getPort(),
                path:       "/attachment?id=" + profileId,
                method:     "GET",
                headers:    this.rc.getHeaders(),
                encoding:   "binary",
                mimeType:   "image"
            }
        )
    }
};

function processArray(array, callback){
    let resultPromises = array.map(
        function(item){
            return callback(item);
        }
    );
    return Promise
        .all(resultPromises)
        .then(
            function(result){
                return result;
            }
        )
}

// Traverse the JSON Response and Find Required Fields
function findNode(key, currentNode, maxDepth) {
    let i,
        currentChild,
        result;
    if (maxDepth <= 0) {
        return false;
    }
    if (currentNode.hasOwnProperty(key)) {
        return currentNode[key];
    } else {
        // Use a for loop instead of forEach to avoid nested functions
        // Otherwise "return" will not work properly
        for (i = 0; i < Object.keys(currentNode).length; i += 1) {
            currentChild = currentNode[Object.keys(currentNode)[i]];
            if (currentChild === null) {
                continue;
            }
            // Search in the current child
            result = findNode(key, currentChild, maxDepth - 1);
            // Return the result if the node has been found
            if (result !== false) {
                return result;
            }
        }
        // The node has not been found and we have no more options
        return false;
    }
}

class ResourceConverter {
    constructor(resource, model, requestChain){
        this.resource       = resource;
        this.model          = model;
        this.requestChain   = requestChain;
        this.preformat();
        this.prune();
        this.normalize();
    }

    // Removes Properties not in Model from the Resource
    prune(){
        let self = this;
        Object.keys(self.resource).forEach(
            function(key){
                if (self.model[key] === undefined) {
                    delete self.resource[key];
                }
            }
        )
    }

    // Adds Properties not Found in the Original Resources, but the Ones Specified in Model
    normalize(){
        let self = this;
        Object.keys(self.model).forEach(
            function(key){
                if (self.resource[key] === undefined) {
                    self.resource[key] = null;
                }
            }
        )
    }
    preformat(){
        //TODO: Implement
    }
    postformat(){
        let self = this;
        let promises = [];

        Object.keys(self.model).forEach(
            function(field){
                if (self.resource[field] !== null) { // Don't Do Any Logic if There is Nothing to Process
                    switch (field){ // Every Field Modification Should be a Promise
                        case "profileId":
                            promises.push(
                                self.requestChain.getImage(self.resource[field]).then(
                                    (data) => {
                                        self.resource.image = data;
                                    }
                                )
                            );
                            break;
                        default:
                            promises.push(
                                Promise.resolve(self.resource)
                            );
                            break;
                    }
                }
            }
        );
        // All Transformation are Done in Asynchronous Fashion on self.resource.
        // This Means That We Only Return if All the Promises are Resolved.
        return Promise
            .all(promises)
            .then(
                function(){
                    return self.resource;
                }
            )
    }
}


