'use strict';
var module = angular.module('app.controllers');
module.controller('WordsNewController', ['$scope', '$location', 'Word',
  function($scope, $location, Word) {

    $scope.manipulationName = '新建';

    $scope.save = function() {
      Word.$create($scope.object);
      $location.path('/words')
    };

    $scope.cancel = function() {
      $location.path('/words');
    };
  }
]);
