'use strict';
var module = angular.module('app.services');
module.factory('SessionService', [function () {
    var DEFAULT_TOKEN = 'none';
    var session = {
      token: DEFAULT_TOKEN
    };
    var service = {      
        isSignined: function() {
          return true;
          return undefined !== session.token && 'none' !== session.token;
        },
        
        setToken: function (token) {          
        },
        
        getToken: function () {
          return session.token;
        }
    };
    return service;
}]);
