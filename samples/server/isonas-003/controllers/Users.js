'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.userGET = function userGET (req, res, next) {
  var id = req.swagger.params['id'].value;
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

module.exports.userPUT = function userPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  var user = req.swagger.params['user'].value;
  Users.userPUT(id,user)
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
