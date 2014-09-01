'use strict';
var module = angular.module('app.controllers');
// 目录控制器-修改
module.controller('CategoriesUpdateController', ['$scope', '$location', '$routeParams', 'CategoriesRest',
    function ($scope, $location, $routeParams, CategoriesRest) {
        $scope.manipulationName = '修改';

        CategoriesRest.get($routeParams.id).then(function (category) {
            $scope.category = category
        });

        $scope.toggle = function() {
          // e.preventDefault();
          $("#wrapper").toggleClass("toggled");
        }

        $scope.save = function () {
            CategoriesRest.update($scope.category);
            $location.path('/categories')
        };

        $scope.cancel = function () {
            $location.path('/categories');
        };
    }]);
