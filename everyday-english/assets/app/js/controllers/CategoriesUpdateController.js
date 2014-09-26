'use strict';
var module = angular.module('app.controllers');
// 目录控制器-修改
module.controller('CategoriesUpdateController', ['$scope', '$location', '$routeParams', 'Category',
    function ($scope, $location, $routeParams, Category) {
        $scope.manipulationName = '修改';

    Category.$find($routeParams.id).$then(function(category) {
            $scope.category = category;
        });

        $scope.toggle = function() {
          // e.preventDefault();
          $("#wrapper").toggleClass("toggled");
        }

        $scope.save = function () {
          $scope.category.$save();            
            $location.path('/categories')
        };

        $scope.cancel = function () {
            $location.path('/categories');
        };
    }]);
