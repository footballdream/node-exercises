/**
 * AuthController
 *
 * @description :: Server-side logic for managing Authcontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
var passport = require('passport'),
   uuid = require('node-uuid'), util = require('util'), 
   captchagen = require('captchagen');
   
var SIGNIN_RETURN_CODE = {
  SUCCESSFUL: 10001, // 登录成功
  USER_OR_PWD_ERROR: 10002, // 登录失败，用户名或密码错误
  CAPTCHA_ERROR: 10003, // 验证码错
  USER_LOCKED: 10004 // 登录失败，用户已被锁定
};
//不需要验证码登录，最大尝试登录次数
var MAX_TRY_SIGNIN_WITHOUT_CAPTCHA = 3;

var SIGNOUT_RETURN_CODE = {
  SUCCESSFUL: 11001, // 注销(退出)成功
};

/**
 * generate random number with bit num
 * @param  {Number} bitNum the random number's bit num
 * @return {String} the string of random number's set
 */
function randomNumberWithBitNum (bitNum) {
  var bn, num = "";
  if (typeof bitNum === undefined) {
    bn = 6;
  } else {
    bn = bitNum;
  }

  for (var i = 0; i < bn; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};

module.exports = {

  login: function(req, res) {
    res.view();
  },

  signin: function(req, res) {
    // 必要时，检验验证码
    if (MAX_TRY_SIGNIN_WITHOUT_CAPTCHA <= req.session.trySignin) {
      if (req.session.captchaCode !== req.param('captchaCode'))
      {
        return res.send({
          code: SIGNIN_RETURN_CODE.CAPTCHA_ERROR,
          message: 'signin failed',
          isNeedCaptcha: true
        });            
      }
    }    
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        if (undefined !== req.session.trySignin)
        {
          req.session.trySignin++;
        } else {
          req.session.trySignin = 1;
        }
        return res.send({
          code: SIGNIN_RETURN_CODE.USER_OR_PWD_ERROR,
          message: 'signin failed',
          isNeedCaptcha: MAX_TRY_SIGNIN_WITHOUT_CAPTCHA <= req.session.trySignin
        });
        res.send(err);
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        var token = uuid.v4();
        console.info('user signin successfully, userName=' 
          + user.name + ', token=' + token + ', from=' + req.ip);
        delete req.session.trySignin;
        delete req.session.captchaCode;
        return res.send({
          code: SIGNIN_RETURN_CODE.SUCCESSFUL,
          message: 'signin successfully',
          userName: user.name,
          token: token
        });
      });
    })(req, res);
  },
  
  signout: function(req, res) {
    var token = req.param('token');
    req.logout();
    console.info('user signout successfully, userName=unknow' 
      + ', token=' + token + ', from=' + req.ip);        
    res.send({
      code: SIGNOUT_RETURN_CODE.SUCCESSFUL,
      message: 'signout successfully'
    });
  },
  
  generateCaptcha: function (req, res) {
    var captcha  = captchagen.create({ 
      height: 60, 
      width: 180, 
      font: "sans", 
      text: randomNumberWithBitNum(6) });
    var captchaCode = captcha.text();
    req.session.captchaCode = captchaCode;
    captcha.generate();
    res.send(captcha.buffer());
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