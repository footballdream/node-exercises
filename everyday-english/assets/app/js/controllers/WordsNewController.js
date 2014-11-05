'use strict';
var module = angular.module('app.controllers');
module.controller('WordsNewController', ['$scope', '$state', 'Word',
  'CategoriesTreeService', 'CategoriesRest',
  function($scope, $state, Word, CategoriesTreeService, CategoriesRest) {
    $scope.manipulationName = '新建';
    $scope.category = {};
    $scope.selectedParent = {};   
    
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
      Word.$create($scope.object).$then(function() {
        $state.go('words');
      });
    };

    $scope.cancel = function() {
      $state.go('words');
    };
  }
]);
