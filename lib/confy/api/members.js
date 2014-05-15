/**
 * Teams contain a list of users. The Authenticated user should be the owner of the organization.
 *
 * @param "org" Name of the organization
 * @param "team" Name of the team
 */
var Members = function(org, team, client) {
  this.org = org;
  this.team = team;
  this.client = client;

  return this;
};

/**
 * Add the user to the given team. The __user__ in the request needs to be a string.
 *
 * '/orgs/:org/teams/:team/member' POST
 *
 * @param "user" Username of the user
 */
Members.prototype.add = function (user, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['user'] = user;

  this.client.post('/orgs/' + this.org + '/teams/' + this.team + '/member', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Remove users from the given team. The __user__ in the request needs to be a string. Cannot delete the default member in a team.
 *
 * '/orgs/:org/teams/:team/member' DELETE
 *
 * @param "user" Username of the user
 */
Members.prototype.remove = function (user, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['user'] = user;

  this.client.delete('/orgs/' + this.org + '/teams/' + this.team + '/member', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Members
