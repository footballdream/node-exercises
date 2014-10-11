'use strict';
var module = angular.module('app.services', ['ngCookies',
  'restmod'
]);
module.config(function(restmodProvider) {
  restmodProvider.rebase('PagedModel');
});
