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

/**
 * Every organization will have a default team named Owners. Owner of the organization will be a default member for every team.
 *
 * @param "org" Name of the organization
 */
Client.prototype.teams = function (org) {
    return new (require('./api/teams'))(org, this.httpClient);
};

/**
 * An organization can contain any number of projects.
 *
 * @param "org" Name of the organization
 */
Client.prototype.projects = function (org) {
    return new (require('./api/projects'))(org, this.httpClient);
};

/**
 * Every project has a default environment named Production. Each environment has one configuration document which can have many keys and values.
 *
 * @param "org" Name of the organization
 * @param "project" Name of the project
 */
Client.prototype.envs = function (org, project) {
    return new (require('./api/envs'))(org, project, this.httpClient);
};

/**
 * Any member of the team which has access to the project can retrieve any of it's environment's configuration document or edit it.
 *
 * @param "org" Name of the organization
 * @param "project" Name of the project
 * @param "env" Name of the environment
 */
Client.prototype.config = function (org, project, env) {
    return new (require('./api/config'))(org, project, env, this.httpClient);
};

// Export module
module.exports = Client;
