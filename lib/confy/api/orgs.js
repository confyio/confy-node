/**
 * Organizations are owned by users and only (s)he can add/remove teams and projects for that organization. A default organization will be created for every user.
 */
var Orgs = function(client) {
  this.client = client;

  return this;
};

/**
 * List all organizations the authenticated user is a member of.
 *
 * '/orgs' GET
 */
Orgs.prototype.list = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var body = (options.query ? options.query : {});

  this.client.get('/orgs', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Get the given organization if the authenticated user is a member.
 *
 * '/orgs/:org' GET
 *
 * @param "org" Name of the organization
 */
Orgs.prototype.retrieve = function (org, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var body = (options.query ? options.query : {});

  this.client.get('/orgs/' + org + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update the given organization if the authenticated user is the owner. __Email__ is the only thing which can be updated.
 *
 * '/orgs/:org' PATCH
 *
 * @param "org" Name of the organization
 * @param "email" Billing email of the organization
 */
Orgs.prototype.update = function (org, email, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var body = (options.body ? options.body : {});
  body['email'] = email;

  this.client.patch('/orgs/' + org + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Orgs;
