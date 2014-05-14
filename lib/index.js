var Client = require('./confy/client');

// Export module
var confy = module.exports;

/**
 * This file contains the global namespace for the module
 */
confy.client = function(auth, options) {
  return new Client(auth, options);
};
