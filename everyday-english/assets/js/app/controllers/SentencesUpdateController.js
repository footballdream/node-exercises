'use strict';
var module = angular.module('app.controllers');
/*
// sentence控制器
module.controller('SentencesUpdateController', ['$scope', '$location', '$routeParams', 'SentencesRest',
    function ($scope, $location, $routeParams, SentencesRest) {
        $scope.manipulationName = '修改';

        SentencesRest.get($routeParams.id).then(function (sentence) {
            $scope.sentence = sentence
        });

        $scope.save = function () {
            SentencesRest.update($scope.sentence);
            $location.path('/sentences')
        };

        $scope.cancel = function () {
            $location.path('/sentences');
        };
    }]);
*/
// sentence控制器
module.controller('SentencesUpdateController', ['$scope', '$location', '$routeParams', 'Sentence',
    function ($scope, $location, $routeParams, Sentence) {
        $scope.manipulationName = '修改';

        Sentence.$find($routeParams.id).$then(function (sentence) {
          $scope.sentence = sentence;
          console.log(sentence);
        });

        $scope.save = function () {
            SentencesRest.update($scope.sentence);
            $location.path('/sentences')
        };

        $scope.cancel = function () {
            $location.path('/sentences');
        };
    }]);
