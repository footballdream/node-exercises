'use strict';
var module = angular.module('app.services');
module.factory('Word', function(restmod) {
  return restmod.model('/api/v1/words');
});
