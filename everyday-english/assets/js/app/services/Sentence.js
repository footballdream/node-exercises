'use strict';
var module = angular.module('app.services');
module.factory('Sentence', function(restmod) {
    return restmod.model('api/v1/sentences');
});
