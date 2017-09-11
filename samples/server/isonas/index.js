'use strict';

var fs = require('fs'),
    express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http'),
    querystring = require('querystring'),
    customMiddleware = require('./custom-middlewares');

var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 3000;

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Authenticate requests
  app.use(customMiddleware['authenticationMiddleware']);

  // Map the requests to Pure Access endpoints
  app.use(customMiddleware['gatewayMiddleware']);

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Validate Fields of the Response
  app.use(customMiddleware['postFormatMiddleware']);

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  app.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
