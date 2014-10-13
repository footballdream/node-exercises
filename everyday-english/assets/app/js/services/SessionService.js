'use strict';
var module = angular.module('app.services');
module.factory('SessionService', [function () {
  var INVALID_TOKEN = 'none';
  var session = {
    token: INVALID_TOKEN
  };
  var service = {      
    isSignined: function() {
      return undefined !== session.token && INVALID_TOKEN !== session.token;
    },
    
    invalidToken: function() {
      session.token = INVALID_TOKEN;
    },
    
    setToken: function (token) {
      session.token = token;
    },
    
    getToken: function () {
      return session.token;
    }
  };
  return service;
}]);
