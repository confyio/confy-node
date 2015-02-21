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
 * Every organization will have a default team named __Owners__. Owner of the organization will be a default member for every team.
 *
 * @param "org" Name of the organization
 */
Client.prototype.teams = function (org) {
    return new (require('./api/teams'))(org, this.httpClient);
};

/**
 * Teams contain a list of users. The Authenticated user should be the owner of the organization.
 *
 * @param "org" Name of the organization
 * @param "team" Name of the team
 */
Client.prototype.members = function (org, team) {
    return new (require('./api/members'))(org, team, this.httpClient);
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
 * List of teams whic have access to the project. Default team __Owners__ will have access to every project. Authenticated user should be the owner of the organization for the below endpoints.
 *
 * @param "org" Name of the organization
 * @param "project" Name of the project
 */
Client.prototype.access = function (org, project) {
    return new (require('./api/access'))(org, project, this.httpClient);
};

/**
 * Every project has a default environment named Production. Each environment has __one__ configuration document which can have many keys and values.
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
