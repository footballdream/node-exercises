'use strict';
var module = angular.module('app.controllers');
// 目录控制器-创建
module.controller('CategoriesNewController', ['$scope', '$state', 'CategoriesRest', 'Category', 'CategoriesTreeService',
    function ($scope,  $state, CategoriesRest, Category, CategoriesTreeService) {
        $scope.category = {};
        $scope.manipulationName = '新建';
        $scope.selectedParent = {};

        $scope.showSelectionDlg = function (id) {
            var my_tree_handler, my_tree, my_treedata, onSelectionCategoryOk;
            my_tree_handler = function (branch) {
                // 响应树节点选中
                $scope.selectedParent.id = branch.id;
                $scope.selectedParent.name = branch.label;
                console.log($scope.selectedParent);
            };
            onSelectionCategoryOk = function() {
                console.log("call parentName");
                 $scope.category.parentId= $scope.selectedParent.id;
                 $scope.category.parentName= $scope.selectedParent.name;
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

        $scope.save = function () {
            Category.$create($scope.category);
            $state.go('categories')
        };

        $scope.cancel = function () {
            $state.go('categories');
        };

    }]);
