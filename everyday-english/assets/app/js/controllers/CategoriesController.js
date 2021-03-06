'use strict';
var module = angular.module('app.controllers');
module.controller('CategoriesController', ['$scope', '$location', 'Category',
  'MessageBoxService', 'toaster', 'blockUI', '$timeout',
  function($scope, $location, Category, MessageBoxService, toaster, blockUI,
    $timeout) {
    $scope.setDataMaintenanceUi();
    $scope.pagesCurrent = 1;
    $scope.pagesTotalPages = 1;
    $scope.sortField = 'id';
    $scope.sortReverse = false;

    $scope.filteredCategories = [];
    $scope.pageMaxShowing = 5;
    $scope.pagePerPage = 8;
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
    
    function refresh() {
      var options = {
        skip: (($scope.pagePage - 1) * $scope.pagePerPage),
        limit: $scope.pagePerPage
      };
      Category.$search(options).$then(function(categorys) {
        blockUI.start();
        $scope.pageTotal = categorys.$pageTotal;
        $scope.pageTotalPages = categorys.$pageTotalPages;
        $scope.filteredCategories = categorys;
        $scope.updatePageInfo();
        $timeout(function() {
          blockUI.stop();
        }, 200);
      });      
    };

    $scope.$watch('pagePage', function() {
      refresh();
    });

    $scope.showNew = function() {
      $location.path('/categories/new');
    };

    $scope.refresh = function() {
      $scope.pagePage = 1;
      refresh();
    }

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
          Category.$destroy().$then(function(){
            toaster.pop('success', "", "删除成功");
            refresh();
          });
        })
      });
    };

  }
]);