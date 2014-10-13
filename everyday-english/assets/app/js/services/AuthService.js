'use strict';
var module = angular.module('app.services');
module.factory('AuthService', ['$http', 'TokenHandler', function ($http, TokenHandler) {
    var service = {
        isSignined: function() {
          return true;
        },
        signin: function (userName, userPwd) {
            var url = '/api/v1/auth/signin'
            var promise = $http.post(url, { name: userName, password: userPwd}).then(function (response) {
                var data = {};
                data = response.data;
                data.returnCode = response.status;
                if (201 == data.returnCode) {
                    TokenHandler.set(data.token)
                } else {
                    TokenHandler.set(null)
                }
                return data;
            });
            return promise;
        },
        signout: function (token) {
            var url = '/api/v1/auth/signout'
            var promise = $http.get(url, {}).then(function (response) {
                var sentence = response.data;
                return sentence;
            });
            return promise;
        }
    };
    return service;
}]);
