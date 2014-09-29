'use strict';
var module = angular.module('app.controllers');
module.controller('WordsUpdateController', ['$scope', '$location',
  '$routeParams', 'Word',
  function($scope, $location, $routeParams, Word) {
    $scope.manipulationName = '修改';

    Word.$find($routeParams.id).$then(function(object) {
      $scope.object = object;
    });

    $scope.save = function() {
      $scope.object.$save();
      $location.path('/words')
    };

    $scope.cancel = function() {
      $location.path('/words');
    };
  }
]);
