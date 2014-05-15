/**
 * An organization can contain any number of projects.
 *
 * @param "org" Name of the organization
 */
var Projects = function(org, client) {
  this.org = org;
  this.client = client;

  return this;
};

/**
 * List all the projects of the organization which can be seen by the authenticated user.
 *
 * '/orgs/:org/projects' GET
 */
Projects.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/orgs/' + this.org + '/projects', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Create a project for the given organization. Authenticated user should be the owner of the organization.
 *
 * '/orgs/:org/projects' POST
 *
 * @param "name" Name of the project
 * @param "description" Description of the project
 */
Projects.prototype.create = function (name, description, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['name'] = name;
  body['description'] = description;

  this.client.post('/orgs/' + this.org + '/projects', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Get a project the user has access to.
 *
 * '/orgs/:org/projects/:project' GET
 *
 * @param "project" Name of the project
 */
Projects.prototype.retrieve = function (project, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/orgs/' + this.org + '/projects/' + project + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update a project. Authenticated user should be the owner of the organization.
 *
 * '/orgs/:org/projects/:project' PATCH
 *
 * @param "project" Name of the project
 * @param "description" Description of the project
 */
Projects.prototype.update = function (project, description, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['description'] = description;

  this.client.patch('/orgs/' + this.org + '/projects/' + project + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Delete the given project. Cannot delete the default project in the organization. Authenticated user should be the owner of the organization.
 *
 * '/orgs/:org/projects/:project' DELETE
 *
 * @param "project" Name of the project
 */
Projects.prototype.destroy = function (project, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/orgs/' + this.org + '/projects/' + project + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Projects
