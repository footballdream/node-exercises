'use strict';
var module = angular.module('app.controllers');
module.controller('SentencesNewController', ['$scope', '$location', 'Sentence',
  function($scope, $location, Sentence) {

    $scope.manipulationName = '新建';

    $scope.save = function() {
      Sentence.$create($scope.sentence);
      $location.path('/sentences')
    };

    $scope.cancel = function() {
      $location.path('/sentences');
    };
  }
]);
