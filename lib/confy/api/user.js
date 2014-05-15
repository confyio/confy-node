/**
 * User who is authenticated currently.
 */
var User = function(client) {
  this.client = client;

  return this;
};

/**
 * Get the authenticated user's profile.
 *
 * '/user' GET
 */
User.prototype.retrieve = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/user', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update the authenticated user's profile
 *
 * '/user' PATCH
 *
 * @param "email" Profile email of the user
 */
User.prototype.update = function (email, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['email'] = email;

  this.client.patch('/user', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = User
