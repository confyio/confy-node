var crypto = require('crypto')
  , Client = require('./confy/client');

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
  if (typeof url === 'string') {
    var nameRegex = '([a-z0-9][a-z0-9-]*[a-z0-9])'
      , tokenRegex = '([a-f0-9]{40})'
      , pathRegex = 'orgs\\/' + nameRegex + '(\\/projects\\/' + nameRegex + '\\/envs\\/' + nameRegex + '\\/config|\\/config\\/' + tokenRegex + ')'
      , urlRegex = new RegExp('(https?:\\/\\/)((.*):(.*)@)?(.*)\\/(' + pathRegex + '|heroku\\/config)', 'i');

    var matches = url.match(urlRegex);

    if (!matches) {
      return callback(Error('Invalid url'));
    }

    url = {
      host: matches[1] + matches[5],
      user: matches[3], pass: matches[4],
      org: matches[7], project: matches[9], env: matches[10],
      token: matches[11],
      heroku: (matches[6] === 'heroku/config')
    };
  }

  if (typeof url !== 'object') {
    return callback(Error('Invalid URL'));
  }

  if (url.user && url.pass && url.heroku) {
    url.path = '/heroku/config';
  } else if (url.token && url.org) {
    url.path = '/orgs/' + url.org + '/config/' + url.token;
  } else if (url.user && url.pass && url.org && url.project && url.env) {
    url.path = '/orgs/' + url.org + '/projects/' + url.project + '/envs/' + url.env + '/config';
  } else {
    return callback(Error('Invalid configuration to generate URL'));
  }

  var auth = {};

  if (url.user && url.pass) {
    auth.username = url.user;
    auth.password = url.pass;
  }

  var client = confy.client(auth, { base: url.host });

  client.httpClient.get(url.path, {}, {}, function (err, response) {
    if (err) return callback(err);

    if (typeof response.body === 'object') {
      return callback(null, response.body);
    }

    var decryptPass = process.env.CONFY_DECRYPT_PASS;

    if (typeof response.body !== 'string') {
      return callback(Error('Invalid credential document'));
    }

    if (!decryptPass) {
      return callback(Error('No decryption password found. Fill env var CONFY_DECRYPT_PASS'));
    }

    var iv = new Buffer(response.body.substr(0, 24), 'base64')
      , key = new Buffer(crypto.createHash('md5').update(decryptPass).digest('hex'));

    var cipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
      , decrypted = cipher.update(response.body.substr(24), 'base64', 'utf-8') + cipher.final('utf-8');

    try {
      response.body = JSON.parse(decrypted);
    } catch (err) {
      return callback(Error('Decryption password is wrong'));
    }

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

  if (type === 'object') {
    if (config instanceof Array) {
      config.forEach(function (value, key) {
        confy.config.path(value, str + '_' + key);
      });
    } else if (config) {
      Object.keys(config).forEach(function (key) {
        confy.config.path(config[key], str + '_' + key.toUpperCase());
      });
    }
  } else if (type === 'boolean') {
    process.env[str.substr(1)] = (config ? 1 : 0);
  } else {
    process.env[str.substr(1)] = config + "";
  }
};
