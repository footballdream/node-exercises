'use strict';
var module = angular.module('app.services');
module.factory('AuthService', ['$http', 'SessionService', 
  function ($http, SessionService) {
    var URL_SIGNIN =  '/api/v1/auth/signin', URL_SIGNOUT = '/api/v1/auth/signout';
    var SIGNIN_RETURN_CODE = {
      SUCCESSFUL: 10001,
      USER_OR_PWD_ERROR: 10002,
      CAPTCHA_ERROR: 10003,
      USER_LOCKED: 10004
    };
    
    var SIGNOUT_RETURN_CODE = {
      SUCCESSFUL: 20001,
      GENERAL_ERROR: 20009
    };
    
    var service = {
        // 登录
        signin: function (name, pwd, captchaCode) {
          var promise = $http.post(URL_SIGNIN, { username: name, password: pwd, captchaCode: captchaCode})
            .then(function (resp) {
                var data = resp.data;
                if (SIGNIN_RETURN_CODE.SUCCESSFUL === data.code) {
                  SessionService.setToken(data.token);
                  SessionService.setUserName(data.userName);
                } else {
                  SessionService.invalidToken();
                }
                return data;
            }, function (resp) {
            });
            return promise;
        },
        getSigninCode: function () {
          return SIGNIN_RETURN_CODE;
        },
        // 注销
        signout: function (token) {
          SessionService.invalidToken();
          var promise = $http.get(URL_SIGNOUT, {params: {token: token}})
          .then(function (resp) {
            var data = resp.data;
            return data;
          }, function (resp) {
          });
          return promise;
        }
    };
    return service;
}]);
