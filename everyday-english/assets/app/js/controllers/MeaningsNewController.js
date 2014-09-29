'use strict';
var module = angular.module('app.controllers');
module.controller('MeaningsNewController', ['$scope', '$location', 'Meaning',
  function($scope, $location, Meaning) {

    $scope.manipulationName = '新建';

    $scope.save = function() {
      Meaning.$create($scope.object);
      $location.path('/meanings')
    };

    $scope.cancel = function() {
      $location.path('/meanings');
    };
  }
]);
