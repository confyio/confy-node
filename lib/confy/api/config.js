/**
 * Any member of the team which has access to the project can retrieve any of it's environment's configuration document or edit it.
 *
 * @param "org" Name of the organization
 * @param "project" Name of the project
 * @param "env" Name of the environment
 */
var Config = function(org, project, env, client) {
  this.org = org;
  this.project = project;
  this.env = env;
  this.client = client;

  return this;
};

/**
 * Get an environment configuration
 *
 * '/orgs/:org/projects/:project/envs/:env/config' GET
 */
Config.prototype.retrieve = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var body = (options.query ? options.query : {});

  this.client.get('/orgs/' + this.org + '/projects/' + this.project + '/envs/' + this.env + '/config', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update the configuration document for the given environment of the project. We will patch the document recursively.
 *
 * '/orgs/:org/projects/:project/envs/:env/config' PATCH
 *
 * @param "config" Configuration to update
 */
Config.prototype.update = function (config, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var body = (options.body ? options.body : {});
  body['config'] = config;

  this.client.patch('/orgs/' + this.org + '/projects/' + this.project + '/envs/' + this.env + '/config', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * List the last 10 versions of the environment configuration
 *
 * '/orgs/:org/projects/:project/envs/:env/versions' GET
 */
Config.prototype.versions = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var body = (options.query ? options.query : {});

  this.client.get('/orgs/' + this.org + '/projects/' + this.project + '/envs/' + this.env + '/versions', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Config;
