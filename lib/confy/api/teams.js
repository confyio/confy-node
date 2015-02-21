/**
 * Every organization will have a default team named __Owners__. Owner of the organization will be a default member for every team.
 *
 * @param "org" Name of the organization
 */
var Teams = function(org, client) {
  this.org = org;
  this.client = client;

  return this;
};

/**
 * List teams of the given organization authenticated user is a member of.
 *
 * '/orgs/:org/teams' GET
 */
Teams.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/orgs/' + this.org + '/teams', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Create a team for the given organization. Authenticated user should be the owner of the organization.
 *
 * '/orgs/:org/teams' POST
 *
 * @param "name" Name of the team
 * @param "description" Description of the team
 */
Teams.prototype.create = function (name, description, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['name'] = name;
  body['description'] = description;

  this.client.post('/orgs/' + this.org + '/teams', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Get the given team in the given organization. Access only if the authenticated user is a member of the team.
 *
 * '/orgs/:org/teams/:team' GET
 *
 * @param "team" Name of the team
 */
Teams.prototype.retrieve = function (team, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/orgs/' + this.org + '/teams/' + team + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update the given team. __Description__ is the only thing which can be updated. Authenticated user should be the owner of the organization.
 *
 * '/orgs/:org/teams/:team' PATCH
 *
 * @param "team" Name of the team
 * @param "description" Description of the team
 */
Teams.prototype.update = function (team, description, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['description'] = description;

  this.client.patch('/orgs/' + this.org + '/teams/' + team + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Delete the given team. Cannot delete the default team in the organization. Authenticated user should be the owner of the organization.
 *
 * '/orgs/:org/teams/:team' DELETE
 *
 * @param "team" Name of the team
 */
Teams.prototype.destroy = function (team, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/orgs/' + this.org + '/teams/' + team + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Teams
