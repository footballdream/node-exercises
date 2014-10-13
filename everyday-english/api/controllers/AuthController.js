/**
 * AuthController
 *
 * @description :: Server-side logic for managing Authcontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
var passport = require('passport'),
   uuid = require('node-uuid'), util = require('util');
   
var RETURN_CODE = {
  SUCCESSFUL: 10001, // 登录成功
  USER_OR_PWD_ERROR: 10002, // 登录失败，用户名或密码错误
  USER_LOCKED: 10003 // 登录失败，用户已被锁定
};

module.exports = {

  login: function(req, res) {
    res.view();
  },

  signin: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.send({
          code: RETURN_CODE.USER_OR_PWD_ERROR,
          message: 'signin failed'
        });
        res.send(err);
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        var token = uuid.v4();
        console.info('user signin successfully, userName=' 
          + user.name + ', token=' + token + ', from=' + req.ip);
        return res.send({
          code: RETURN_CODE.SUCCESSFUL,
          message: 'signin successfully',
          userName: user.name,
          token: token
        });
      });
    })(req, res);
  },
  
  signout: function(req, res) {
    req.logout();
    res.send('logout successful');
  }
};

/**
 * Sails controllers expose some logic automatically via blueprints.
 *
 * Blueprints are enabled for all controllers by default, and they can be turned on or off
 * app-wide in `config/controllers.js`. The settings below are overrides provided specifically
 * for AuthController.
 *
 * NOTE:
 * REST and CRUD shortcut blueprints are only enabled if a matching model file
 * (`models/Auth.js`) exists.
 *
 * NOTE:
 * You may also override the logic and leave the routes intact by creating your own
 * custom middleware for AuthController's `find`, `create`, `update`, and/or
 * `destroy` actions.
 */

module.exports.blueprints = {

  // Expose a route for every method,
  // e.g.
  // `/auth/foo` =&gt; `foo: function (req, res) {}`
  actions: true,

  // Expose a RESTful API, e.g.
  // `post /auth` =&gt; `create: function (req, res) {}`
  rest: true,

  // Expose simple CRUD shortcuts, e.g.
  // `/auth/create` =&gt; `create: function (req, res) {}`
  // (useful for prototyping)
  shortcuts: true

};