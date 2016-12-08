var assert = require('chai').assert
  , confy = require('../lib');

describe('Testing match function', function () {

  describe('with full url', function () {
    var url = 'https://user:pass@api.confy.io/orgs/org/projects/project/envs/env/config';
    var result = confy.config.match(url);

    it('should not return error', function () {
      assert.notInstanceOf(result, Error);
    });

    it('should return url object', function () {
      assert.isObject(result);
      assert.equal(result.host, 'https://api.confy.io');
    });

    it('should have auth info', function () {
      assert.equal(result.user, 'user');
      assert.equal(result.pass, 'pass');
    });

    it('should have org info', function () {
      assert.equal(result.org, 'org');
    });

    it('should have stage info', function () {
      assert.equal(result.project, 'project');
      assert.equal(result.env, 'env');
    });

    it('should not have heroku', function () {
      assert.isFalse(result.heroku);
    });

    it('should not have token', function () {
      assert.isUndefined(result.token);
    });

    it('should have correct path', function () {
      assert.equal(result.path, '/orgs/org/projects/project/envs/env/config');
    });
  });

  describe('with token url', function () {
    var url = 'https://api.confy.io/orgs/org/config/abcdefabcdefabcdefabcdefabcdef1234567890';
    var result = confy.config.match(url);

    it('should not return error', function () {
      assert.notInstanceOf(result, Error);
    });

    it('should return url object', function () {
      assert.isObject(result);
      assert.equal(result.host, 'https://api.confy.io');
    });

    it('should not have auth info', function () {
      assert.isUndefined(result.user);
      assert.isUndefined(result.pass);
    });

    it('should have org info', function () {
      assert.equal(result.org, 'org');
    });

    it('should not have stage info', function () {
      assert.isUndefined(result.project);
      assert.isUndefined(result.env);
    });

    it('should not have heroku', function () {
      assert.isFalse(result.heroku);
    });

    it('should have token', function () {
      assert.equal(result.token, 'abcdefabcdefabcdefabcdefabcdef1234567890');
    });

    it('should have correct path', function () {
      assert.equal(result.path, '/orgs/org/config/abcdefabcdefabcdefabcdefabcdef1234567890');
    });
  });

  describe('with heroku url', function () {
    var url = 'https://user:pass@api.confy.io/heroku/config';
    var result = confy.config.match(url);

    it('should not return error', function () {
      assert.notInstanceOf(result, Error);
    });

    it('should return url object', function () {
      assert.isObject(result);
      assert.equal(result.host, 'https://api.confy.io');
    });

    it('should have auth info', function () {
      assert.equal(result.user, 'user');
      assert.equal(result.pass, 'pass');
    });

    it('should not have org info', function () {
      assert.isUndefined(result.org);
    });

    it('should not have stage info', function () {
      assert.isUndefined(result.project);
      assert.isUndefined(result.env);
    });

    it('should have heroku', function () {
      assert.isTrue(result.heroku);
    });

    it('should not have token', function () {
      assert.isUndefined(result.token);
    });

    it('should have correct path', function () {
      assert.equal(result.path, '/heroku/config');
    });
  });

  describe('with non-string and non-object url', function () {
    var result = confy.config.match(8);

    it('should return error', function () {
      assert.instanceOf(result, Error);
      assert.equal(result.message, 'Invalid URL');
    });
  });

  describe('with bad url', function () {
    var result = confy.config.match('http://api.confy.io/projects/config');

    it('should return error', function () {
      assert.instanceOf(result, Error);
      assert.equal(result.message, 'Invalid URL');
    });
  });

  describe('with empty object', function () {
    var result = confy.config.match({ user: 'user', pass: 'pass', heroku: true });

    it('should return error', function () {
      assert.instanceOf(result, Error);
      assert.equal(result.message, 'Invalid URL');
    });
  });
});
