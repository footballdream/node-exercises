'use strict';
var module = angular.module('app.controllers');
module.controller('SentencesUpdateController', ['$scope', '$location',
  '$routeParams', 'Sentence',
  function($scope, $location, $routeParams, Sentence) {
    $scope.manipulationName = '修改';

    Sentence.$find($routeParams.id).$then(function(sentence) {
      $scope.sentence = sentence;
    });

    $scope.save = function() {
      $scope.sentence.$save();
      $location.path('/sentences')
    };

    $scope.cancel = function() {
      $location.path('/sentences');
    };
  }
]);
