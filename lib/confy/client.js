/**
 * Main client for the module
 */
var Client = function(auth, options) {
  this.httpClient = new (require('./http_client').HttpClient)(auth, options);

  return this;
};

/**
 * User who is authenticated currently.
 */
Client.prototype.user = function () {
    return new (require('./api/user'))(this.httpClient);
};

/**
 * Organizations are owned by users and only (s)he can add/remove teams and projects for that organization. A default organization will be created for every user.
 */
Client.prototype.orgs = function () {
    return new (require('./api/orgs'))(this.httpClient);
};

// Export module
module.exports = Client;
