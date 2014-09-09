'use strict';
var module = angular.module('app.controllers');
module.controller('CategoriesController', ['$scope', '$location', 'Category',
  'MessageBoxService',
  function($scope, $location, Category, MessageBoxService) {
    $scope.pagesCurrent = 1;
    $scope.pagesTotalPages = 1;
    $scope.sortField = 'id';
    $scope.sortReverse = false;

    $scope.filteredCategories = [];
    $scope.pageMaxShowing = 5;
    $scope.pagePerPage = 10;
    $scope.pagePage = 1;
    $scope.pageTotal = 0;
    $scope.pageTotalPages = 1;

    $scope.updatePageInfo = function() {
      var minIndex = (0 != $scope.pageTotal) ? Math.max(($scope.pagePerPage *
        ($scope.pagePage - 1)) + 1, 1) : 0;
      var maxIndex = Math.min($scope.pagePerPage * $scope.pagePage, $scope
        .pageTotal)
      $scope.pageInfo = "显示" + minIndex + "到" + maxIndex + "，共" + $scope.pageTotal

    };

    $scope.$watch('pagePage', function() {
      var options = {
        skip: (($scope.pagePage - 1) * $scope.pagePerPage),
        limit: $scope.pagePerPage
      };
      Category.$search(options).$then(function(categorys) {
        $scope.pageTotal = categorys.$pageTotal;
        $scope.pageTotalPages = categorys.$pageTotalPages;
        $scope.filteredCategories = categorys;
        $scope.updatePageInfo();
      })
    });

    $scope.showNew = function() {
      $location.path('/categories/new');
    };


    $scope.showUpdate = function(id) {
      $location.path('/categories/' + id);
    };

    $scope.showDelete = function(id) {
      var modalOptions = {
        closeButtonText: '取消',
        actionButtonText: '确定',
        headerText: '确认',
        bodyText: '确定要删除吗？'
      };

      MessageBoxService.showModal({}, modalOptions).then(function(result) {
        Category.$find(id).$then(function(Category) {
          Category.$destroy();
          $scope.pagePage = 1;
        })
      });
    };

  }
]);
