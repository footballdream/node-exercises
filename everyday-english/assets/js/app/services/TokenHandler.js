'use strict';
var module = angular.module('app.services');
module.factory('TokenHandler', ['$cookies', '$cookieStore', function ($cookies, $cookieStore) {
    var tokenHandler = {};
    var token = "none";
    if (undefined == $cookies.token) {
        console.log('init token, token=none')
        token = "none";
    } else {
        token = $cookies.token;
        console.log('init token, token=' + token)
    }

    tokenHandler.set = function (newToken) {
        token = newToken;
        $cookies.token = newToken;
        console.log('setToken:' + newToken);
    };

    tokenHandler.get = function () {
        console.log('getToken:' + token);
        return token;
    };

    // wrap given actions of a resource to send auth token with every
    // request
    tokenHandler.wrapActions = function (resource, actions) {
        // copy original resource
        var wrappedResource = resource;
        for (var i = 0; i < actions.length; i++) {
            tokenWrapper(wrappedResource, actions[i]);
        }
        ;
        // return modified copy of resource
        return wrappedResource;
    };

    // wraps resource action to send request with auth token
    var tokenWrapper = function (resource, action) {
        // copy original action
        resource['_' + action] = resource[action];
        // create new action wrapping the original and sending token
        resource[action] = function (data, success, error) {
            return resource['_' + action](
                angular.extend({}, data || {}, {access_token: tokenHandler.get()}),
                success,
                error
            );
        };
    };

    return tokenHandler;
}]);
