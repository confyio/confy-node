var Client = require('./confy/client');

// Export module
var confy = module.exports;

/**
 * This file contains the global namespace for the module
 */
confy.client = function(auth, options) {
  return new Client(auth, options);
};

/**
 * Config retrieval function
 */
confy.config = function (url, callback) {

  if (typeof url == 'string') {
    var matches = url.match(/(https?:\/\/)(.*):(.*)@(.*)\/orgs\/([a-z0-9]*)\/projects\/([a-z0-9]*)\/envs\/([a-z0-9]*)\/config/i);

    url = {
      host: matches[1] + matches[4], user: matches[2], pass: matches[3],
      org: matches[5], project: matches[6], env: matches[7]
    };
  }

  var client = confy.client({
    username: url.user, password: url.pass
  }, { base: url.host });

  client.config(url.org, url.project, url.env).retrieve(function (err, response) {
    if (err) return callback(err);

    callback(null, response.body);
  });
};
