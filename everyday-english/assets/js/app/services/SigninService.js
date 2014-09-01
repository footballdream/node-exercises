'use strict';
var module = angular.module('app.services');
module.factory('SigninService', ['$http', 'TokenHandler', function ($http, TokenHandler) {
    var service = {
        signin: function (userName, userPwd) {
            console.log('userName=' + userName + ", password=" + userPwd)
            var url = "/everyday/api/1.0.0/auth/signin"
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
            var url = "/everyday/api/1.0.0/auth/signout"
            var promise = $http.get(url, {}).then(function (response) {
                var sentence = response.data;
                return sentence;
            });
            return promise;
        }
    };
    return service;
}]);
