'use strict';
var module = angular.module('app.controllers');
// 目录控制器-修改
module.controller('CategoriesUpdateController', ['$scope', '$state', '$stateParams', 'Category',
    function ($scope, $state, $stateParams, Category) {
        $scope.manipulationName = '修改';

    Category.$find($stateParams.id).$then(function(category) {
            $scope.category = category;
        });

        $scope.toggle = function() {
          // e.preventDefault();
          $("#wrapper").toggleClass("toggled");
        }

        $scope.save = function () {
          $scope.category.$save();            
          $state.go('categories')
        };

        $scope.cancel = function () {
          $state.go('categories')
        };
    }]);
