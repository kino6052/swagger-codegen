'use strict';

var utils = require('../utils/writer.js');
var Users = require('../controllers/UsersService');

module.exports.userGET = function userGET (req, res, next) {
  var id = req.swagger.params['userId'].value;
  Users.userGET(id)
    .then(function (response) {
      res.setHeader('Content-Type', 'application/json');
      res.examples = response;
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userPATCH = function userPATCH (req, res, next) {
  var id = req.swagger.params['userId'].value;
  var jsonPatch = req.swagger.params['JsonPatch'].value;
  Users.userPATCH(id,jsonPatch)
    .then(function (response) {
      res.setHeader('Content-Type', 'application/json');
      res.examples = response;
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersGET = function usersGET (req, res, next) {
  Users.usersGET()
    .then(function (response) {
      res.setHeader('Content-Type', 'application/json');
      res.examples = response;
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
