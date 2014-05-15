/**
 * Every project has a default environment named Production. Each environment has one configuration document which can have many keys and values.
 *
 * @param "org" Name of the organization
 * @param "project" Name of the project
 */
var Envs = function(org, project, client) {
  this.org = org;
  this.project = project;
  this.client = client;

  return this;
};

/**
 * List all the environmens of the project which can be seen by the authenticated user.
 *
 * '/orgs/:org/projects/:project/envs' GET
 */
Envs.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/orgs/' + this.org + '/projects/' + this.project + '/envs', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Create an environment for the given project. Authenticated user should have access to the project.
 *
 * '/orgs/:org/projects/:project/envs' POST
 *
 * @param "name" Name of the environment
 * @param "description" Description of the environment
 */
Envs.prototype.create = function (name, description, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['name'] = name;
  body['description'] = description;

  this.client.post('/orgs/' + this.org + '/projects/' + this.project + '/envs', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Get an environment of the project the user has access to.
 *
 * '/orgs/:org/projects/:project/envs/:env' GET
 *
 * @param "env" Name of the environment
 */
Envs.prototype.retrieve = function (env, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/orgs/' + this.org + '/projects/' + this.project + '/envs/' + env + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update an environment. Authenticated user should have access to the project.
 *
 * '/orgs/:org/projects/:project/envs/:env' PATCH
 *
 * @param "env" Name of the environment
 * @param "description" Description of the environment
 */
Envs.prototype.update = function (env, description, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['description'] = description;

  this.client.patch('/orgs/' + this.org + '/projects/' + this.project + '/envs/' + env + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Delete the given environment of the project. Authenticated user should have access to the project. Cannot delete the default environment.
 *
 * '/orgs/:org/projects/:project/envs/:env' DELETE
 *
 * @param "env" Name of the environment
 */
Envs.prototype.destroy = function (env, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/orgs/' + this.org + '/projects/' + this.project + '/envs/' + env + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Envs
