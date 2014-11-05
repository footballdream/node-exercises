'use strict';
var module = angular.module('app.controllers');
module.controller('WordsUpdateController', ['$scope', '$state',
  '$stateParams', 'Word', 'CategoriesTreeService', 'CategoriesRest',
  function($scope, $state, $stateParams, Word, CategoriesTreeService, CategoriesRest) {
    $scope.manipulationName = '修改';
    $scope.category = {};
    $scope.selectedParent = {};    

    Word.$find($stateParams.id).$then(function(object) {
      $scope.object = object;
      $scope.category = object.category;
    });
    
    $scope.showSelectionDlg = function (id) {
      var my_tree_handler, my_tree, my_treedata, onSelectionCategoryOk;
      my_tree_handler = function (branch) {
        // 响应树节点选中
        $scope.selectedParent.id = branch.id;
        $scope.selectedParent.name = branch.label;
      };
      onSelectionCategoryOk = function() {
        $scope.category.id = $scope.selectedParent.id;
        $scope.category.name= $scope.selectedParent.name;
      };
      CategoriesRest.tree().then(function (categoryTree) {
          my_treedata = categoryTree;
          console.log(my_treedata);
          my_tree = {};
          
          var modalOptions = {
            closeButtonText: '取消',
            actionButtonText: '确定',
            headerText: '选择上级目录',
            data: my_treedata,
            tree_handler: my_tree_handler,
            ok: onSelectionCategoryOk
          };
          
          CategoriesTreeService.showModal({}, modalOptions).then(function (result) {
          });
      });
    };

    $scope.save = function() {
      $scope.object.category = $scope.category.id;
      $scope.object.$save().$then(function() {
        $state.go('words');
      });
    };

    $scope.cancel = function() {
      $state.go('words');
    };
  }
]);
