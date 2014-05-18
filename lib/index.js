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
 * Config retrieval functions
 */
confy.config = {};

confy.config.load = function (url, callback) {
  if (typeof url == 'string') {
    var matches = url.match(/(https?:\/\/)(.*):(.*)@(.*)\/orgs\/([a-z0-9]*)\/projects\/([a-z0-9]*)\/envs\/([a-z0-9]*)\/config/i);

    if(!matches) return callback(Error('Invalid url'));

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

confy.config.env = function (url, callback) {
  confy.config.load(url, function (err, config) {
    if (err) return callback(err);

    confy.config.path(config);

    callback(null);
  });
};

confy.config.path = function (config, str) {
  var type = typeof config;

  if (str === undefined) {
    str = '';
  }

  if (type == 'object') {
    if (config instanceof Array) {
      config.forEach(function (value, key) {
        confy.config.path(value, str + '_' + key);
      });
    } else if (config) {
      Object.keys(config).forEach(function (key) {
        confy.config.path(config[key], str + '_' + key.toUpperCase());
      });
    }
  } else if (type == 'boolean') {
    process.env[str.substr(1)] = (config ? 1 : 0);
  } else {
    process.env[str.substr(1)] = config + "";
  }
};
