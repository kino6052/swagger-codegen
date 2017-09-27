'use strict';


/**
 * Get User
 *
 * id String ID of user to retrieve
 * returns User
 **/
exports.userGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "image" : "image",
  "displayName" : "displayName",
  "disable" : true,
  "employeeId" : 6,
  "id" : 0,
  "mi" : "mi",
  "notificationEmail" : "notificationEmail",
  "userDefinedFields" : "{}"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update User
 *
 * id String ID of user to update
 * user UserUpdate User Update Data
 * returns User
 **/
exports.userPATCH = function(id,user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "image" : "image",
  "displayName" : "displayName",
  "disable" : true,
  "employeeId" : 6,
  "id" : 0,
  "mi" : "mi",
  "notificationEmail" : "notificationEmail",
  "userDefinedFields" : "{}"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get All Users
 *
 * returns Users
 **/
exports.usersGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [
        {
            "id": 0,
            "displayName": "string"
        }
    ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

