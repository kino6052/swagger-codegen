'use strict';

var utils = require('../utils/writer.js');
var Users = require('../controllers/UsersService');

module.exports.userGET = function userGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Users.userGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
