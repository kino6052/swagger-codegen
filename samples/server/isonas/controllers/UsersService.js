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
  "lastName" : "lastName",
  "image" : "image",
  "adGUID" : "adGUID",
  "displayName" : "displayName",
  "employeeId" : "employeeId",
  "latchInterval" : 6.02745618307040320615897144307382404804229736328125,
  "userDefinedFieldValues" : [ "userDefinedFieldValues", "userDefinedFieldValues" ],
  "notificationEmail" : "notificationEmail",
  "firstName" : "firstName",
  "currentTenantId" : 5.962133916683182377482808078639209270477294921875,
  "profileId" : 1.46581298050294517310021547018550336360931396484375,
  "disable" : true,
  "id" : 0.80082819046101150206595775671303272247314453125,
  "mi" : "mi",
  "currentAreaId" : 5.63737665663332876420099637471139430999755859375
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get Users
 *
 * returns List
 **/
exports.usersGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "lastName" : "lastName",
  "image" : "image",
  "adGUID" : "adGUID",
  "displayName" : "displayName",
  "employeeId" : "employeeId",
  "latchInterval" : 6.02745618307040320615897144307382404804229736328125,
  "userDefinedFieldValues" : [ "userDefinedFieldValues", "userDefinedFieldValues" ],
  "notificationEmail" : "notificationEmail",
  "firstName" : "firstName",
  "currentTenantId" : 5.962133916683182377482808078639209270477294921875,
  "profileId" : 1.46581298050294517310021547018550336360931396484375,
  "disable" : true,
  "id" : 0.80082819046101150206595775671303272247314453125,
  "mi" : "mi",
  "currentAreaId" : 5.63737665663332876420099637471139430999755859375
}, {
  "lastName" : "lastName",
  "image" : "image",
  "adGUID" : "adGUID",
  "displayName" : "displayName",
  "employeeId" : "employeeId",
  "latchInterval" : 6.02745618307040320615897144307382404804229736328125,
  "userDefinedFieldValues" : [ "userDefinedFieldValues", "userDefinedFieldValues" ],
  "notificationEmail" : "notificationEmail",
  "firstName" : "firstName",
  "currentTenantId" : 5.962133916683182377482808078639209270477294921875,
  "profileId" : 1.46581298050294517310021547018550336360931396484375,
  "disable" : true,
  "id" : 0.80082819046101150206595775671303272247314453125,
  "mi" : "mi",
  "currentAreaId" : 5.63737665663332876420099637471139430999755859375
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

