'use strict';
var module = angular.module('app.services');
module.factory('Meaning', function(restmod) {
  return restmod.model('/api/v1/meanings');
});
