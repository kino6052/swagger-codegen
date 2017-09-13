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
  "userDefinedFields" : [ "{}", "{}" ]
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
 * jsonPatch PatchRequest JSON Patch Document
 * returns User
 **/
exports.userPATCH = function(id,jsonPatch) {
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
  "userDefinedFields" : [ "{}", "{}" ]
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
 * returns List
 **/
exports.usersGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [
        {
            "id": 0,
            "displayName": "string",
            "firstName": "string",
            "lastName": "string",
            "mi": "string",
            "employeeId": 0,
            "image": "string",
            "notificationEmail": "string",
            "userDefinedFields": [
                {}
            ],
            "disable": true
        }
    ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

