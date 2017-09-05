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
  "id" : "id",
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

