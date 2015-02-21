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
 * List all the projects of the given organization which can be accessed by the authenticated user.
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
 * Create a project if the authenticated user is the owner of the given organization. Only the __owners__ team will be able to see the project initially.
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
 * Get the given project in the given organization. Works only if the authenticated user has access to the project.
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
 * Update the given project. __Description__ is the only thing which can be updated. Authenticated user should be the owner of the organization.
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
 * Delete the given project. Authenticated user should be the owner of the organization.
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
