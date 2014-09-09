'use strict';
var module = angular.module('app.services');
module.factory('Category', function(restmod) {
  return restmod.model('api/v1/categories');
});
