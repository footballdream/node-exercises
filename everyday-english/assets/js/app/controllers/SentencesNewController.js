'use strict';
var module = angular.module('app.controllers');
// sentence控制器
module.controller('SentencesNewController', ['$scope', '$location', 'SentencesRest',
    function ($scope, $location, SentencesRest) {

        $scope.manipulationName = '新建';
        $scope.save = function () {
            SentencesRest.create($scope.sentence);
            $location.path('/sentences')
        };
        $scope.cancel = function () {
            $location.path('/sentences');
        };
    }]);
