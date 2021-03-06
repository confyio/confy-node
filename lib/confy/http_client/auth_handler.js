/**
 * This module takes care of devising the auth type and using it
 */
var Auth = function(auth) {
  this.auth = auth;

  this.HTTP_PASSWORD = 0;

  return this;
};

/**
 * Calculating the type of authentication
 */
Auth.prototype.getAuthType = function () {

  if (this.auth.username && this.auth.password) {
    return this.HTTP_PASSWORD;
  }

  return -1;
};

/**
 * Set authentication for the request
 *
 * This should throw error because this should be caught while in development
 */
Auth.prototype.set = function (request, callback) {
  if (Object.keys(this.auth).length === 0) {
    return callback(null, request);
  }

  var auth = this.getAuthType(), flag = false;

  if (auth === this.HTTP_PASSWORD) {
    request = this.httpPassword(request);
    flag = true;
  }

  if (!flag) {
      return callback(new Error('Unable to calculate authorization method. Please check.'));
  }

  callback(null, request);
};

/**
 * Basic Authorization with username and password
 */
Auth.prototype.httpPassword = function(request) {
  request.auth = this.auth;

  return request;
};

// Export module
module.exports = Auth;
