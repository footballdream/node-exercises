'use strict';
var module = angular.module('app.controllers');
module.controller('MeaningsUpdateController', ['$scope', '$location',
  '$routeParams', 'Meaning',
  function($scope, $location, $routeParams, Meaning) {
    $scope.manipulationName = '修改';

    Meaning.$find($routeParams.id).$then(function(object) {
      $scope.object = object;
    });

    $scope.save = function() {
      $scope.object.$save();
      $location.path('/meanings')
    };

    $scope.cancel = function() {
      $location.path('/meanings');
    };
  }
]);
