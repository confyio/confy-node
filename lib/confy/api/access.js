/**
 * List of teams who has access to the project. Default team __Owners__ will have access to every project. Authenticated user should be the owner of the organization for the below endpoints.
 *
 * @param "org" Name of the organization
 * @param "project" Name of the project
 */
var Access = function(org, project, client) {
  this.org = org;
  this.project = project;
  this.client = client;

  return this;
};

/**
 * Give the team access to the given project. The __team__ in the request needs to be a string.
 *
 * '/orgs/:org/projects/:project/access' POST
 *
 * @param "team" Name of the team
 */
Access.prototype.add = function (team, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['team'] = team;

  this.client.post('/orgs/' + this.org + '/projects/' + this.project + '/access', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Remove project access for the given team. The __team__ in the request needs to be a string. Can't delete default team's access.
 *
 * '/orgs/:org/projects/:project/access' DELETE
 *
 * @param "team" Name of the team
 */
Access.prototype.remove = function (team, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['team'] = team;

  this.client.delete('/orgs/' + this.org + '/projects/' + this.project + '/access', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Access
