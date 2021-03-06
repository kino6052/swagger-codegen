const querystring     = require('querystring');
const http            = require('http');

// Authentication Middleware
module.exports.authenticationMiddleware = function authenticationMiddleware(req, res, next){
  const options = {
    hostname: req.swagger.swaggerObject.host.replace(/:\d*/, ''),
    port: req.swagger.swaggerObject.host.replace(/\w*:/, ''),
    path: "/login",
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'username=api; utoken=manager;',
    }
  };

  function decodeBase64(b64String){
      try {
          const strippedString = b64String.replace("Basic", "").replace(" ", "");
          const decoded = new Buffer(strippedString, 'base64').toString();
          const username = decoded.replace(/:.+/, "");
          const password = decoded.replace(/.+:/, "");
          return {username:username, pwd: password};
      } catch (e) {
          return {username:"", pwd: ""}
      }
  }


  const postData = querystring.stringify(decodeBase64(req.header("Authorization")));

  const request = http.request(options, (response) => {
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
          var data = JSON.parse(chunk);
          if (data.success) {
              next();
          } else {
              res.header({"content-type": "application/json"});
              res.status(403).send(JSON.stringify({"message": "Unauthenticated"}));
          }
      });
  });

  request.on('error', (e) => {
     console.error(`Problem with Request: ${e.message}`);
  });

  request.write(postData);
  request.end();
}

// Gateway Middleware
module.exports.gatewayMiddleware = function gatewayMiddleware(req, res, next){
    try {
        const integration = req.swagger.operation["x-apigateway-integration"];
        const options = {
            hostname: integration.hostname,
            port: integration.port,
            path: integration.path + "?" + querystring.stringify(req.query),
            method: integration.httpMethod,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'username=api; utoken=manager;',
            },
            query: req.query,
            params: req.params
        };

        var body = "";

        const request = http.request(options, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                body += chunk;
            });
            response.on('end', () =>
                {
                    var data = JSON.parse(body);
                    if (data.success) {
                        res.data = data;
                        next();
                    } else {
                        res.header({"content-type": "application/json"});
                        res.status(403).send(JSON.stringify({"message": "Unauthenticated"}));
                    }
                }
            );
        });



        request.on('error', (e) => {
            console.error(`Problem with Request: ${e.message}`);
        });
        request.end();
    } catch (e) {
        next();
    }
}

function findNode(key, currentNode, maxDepth) {
    var i,
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
                return false;
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

var resultParser = function f(input) {
    var result = {};
    if (!input.hasOwnProperty("id")) {
        throw new Error();
    }
    return function f(property) {
        result[property] = findNode(property, input, 3);
        if (result[property] === false) {
            result[property] = null;
        } else {
            result[property] = propertyFormatter(result[property], property);
        }
        f.result = result;
    };
}

module.exports.resultParser = resultParser;

// Parse the Result and Populate Fields
module.exports.postFormatMiddleware = function postFormatMiddleware(req, res, next){
    var examples = res.examples;
    var result = res.data.result;

    // Conform the Results to the Fields in Model as Defined in the Swagger File
    const parseResult = resultParser;

    // Some Properties will Need to Get Transformed. i.e. Image URL is formed from the profileId
    function propertyFormatter(result, property){
        if (result){
            switch (property){
                case "profileId":
                    result = req.swagger.swaggerObject.host + "/attachment?id="+result;
                    break;
                default:
                    break;
            }
            return result;
        }
    }
    try {
        // Array of Results
        if (res.examples.constructor === Array){
            var newResult = [];
            result.forEach(
                function(i){
                    var callback = parseResult(i);
                    Object.keys(examples[0]).forEach(callback);
                    newResult.push(callback.result);
                }
            );
            result = newResult;
        }
        // Single Result
        else {
            var callback = parseResult(result);
            Object.keys(examples).forEach(callback);
            result = callback.result;
        }
        res.end(JSON.stringify(result));
    } catch (e) {
        res.status(499).send(JSON.stringify({"message": "Bad Result"}));
    }
};



