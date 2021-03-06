'use strict';
var module = angular.module('app.controllers');
// word控制器
module.controller('WordsController', ['$scope', '$location', 'Word',
  'MessageBoxService', 'toaster', 'blockUI', '$timeout',  'CategoriesTreeService', 'CategoriesRest',
  function($scope, $location, Word, MessageBoxService, toaster, blockUI,
    $timeout, CategoriesTreeService, CategoriesRest) {
    $scope.setDataMaintenanceUi();
    $scope.pagesCurrent = 1;
    $scope.pagesTotalPages = 1;
    $scope.sortField = 'id';
    $scope.sortReverse = false;


    /*
    $scope.sort = function (fieldName) {
        if ($scope.sortField != fieldName) {
            $scope.sortField = fieldName;
            $scope.sortReverse = false;
        } else {
            $scope.sortReverse = !$scope.sortReverse;
        }
        $scope.refresh()
    };

    $scope.showUpdate = function (id) {
        console.log("showUpdate, id=" + id);
        $location.path('/sentences/' + id);
    };

    $scope.showNew = function () {
        $location.path('/sentences/new');
    };

    $scope.showDelete = function (id) {
        console.log("showDelete, id=" + id);

        var modalOptions = {
            closeButtonText: '取消',
            actionButtonText: '确定',
            headerText: '确认',
            bodyText: '确定要删除吗？'
        };

        MessageBoxService.showModal({}, modalOptions).then(function (result) {
            SentencesRest.delete(id)
            $scope.paginate(1, true)
        });

    };

    $scope.showingPages = function () {
        var minIndex = Math.max(1, $scope.pagesCurrent - 4)
        var maxIndex = Math.min($scope.pagesTotalPages, $scope.pagesCurrent + 4)
        var indexes = [];
        for (var i = minIndex; i <= maxIndex; i++) {
            indexes.push(i);
        }
        return indexes;
    };

    $scope.setPage = function () {
        $scope.paginate(this.n, false)
    };

    $scope.previousPage = function () {
        var index = $scope.pagesCurrent - 1
        if (0 < index) {
            $scope.paginate(index, true)
        }
    };

    $scope.nextPage = function () {
        var index = $scope.pagesCurrent + 1
        if ($scope.pagesTotalPages >= index) {
            $scope.paginate(index, true)
        }
    }

    $scope.refresh = function () {
        $scope.pagesCurrent = 1;
        $scope.paginate(1, true);
    }

    $scope.paginate = function (pageIndex, force) {
        if (!force && (pageIndex == $scope.pagesCurrent)) {
            return
        }
        console.log('pageIndex=' + pageIndex + ', force=' + force);
        SentencesRest.query(pageIndex, $scope.sortField, $scope.sortReverse).then(function (page) {
            $scope.sentences = page.data
            $scope.pagesCurrent = page.currentPage
            $scope.pagesTotalPages = page.totalPages
            $scope.pagesTotalRecords = page.totalRecords
            $scope.pagesPerPage = page.perPage

            var minIndex = Math.max(($scope.pagesPerPage * ($scope.pagesCurrent - 1)) + 1, 1)
            var maxIndex = Math.min($scope.pagesPerPage * $scope.pagesCurrent, $scope.pagesTotalRecords)
            $scope.pagesInfo = "显示" + minIndex + "到" + maxIndex + "，共" + $scope.pagesTotalRecords
        });
    }

    $scope.refresh()
    */    
        $scope.selectedParent = {};
        $scope.category = {};

        $scope.showSelectionDlg = function (id) {
            var my_tree_handler, my_tree, my_treedata, onSelectionCategoryOk;
            my_tree_handler = function (branch) {
                // 响应树节点选中
                $scope.selectedParent.id = branch.id;
                $scope.selectedParent.name = branch.label;
                console.log($scope.selectedParent);
            };
            onSelectionCategoryOk = function() {
              $scope.category.id = $scope.selectedParent.id;
              $scope.category.name= $scope.selectedParent.name;
              $scope.refresh();              
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

    $scope.filteredObjects = [];
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
      var where = undefined;
      if ($scope.category.id) {
        where = {category: $scope.category.id};
      }
      var options = {
        skip: (($scope.pagePage - 1) * $scope.pagePerPage),
        limit: $scope.pagePerPage,
        where: where
      };
      Word.$search(options).$then(function(objects) {
        blockUI.start();
        $scope.pageTotal = objects.$pageTotal;
        $scope.pageTotalPages = objects.$pageTotalPages;
        $scope.filteredObjects = objects;
        $scope.updatePageInfo();
        $timeout(function() {
          blockUI.stop();
        }, 200);        
      });      
    }

    $scope.refresh = function() {
      $scope.pagePage = 1;
      refresh();
    }
    
    $scope.$watch('pagePage', function() {
      refresh();
    });

    $scope.showNew = function() {
      $location.path('/words/new');
    };


    $scope.showUpdate = function(id) {
      $location.path('/words/' + id);
    };

    $scope.showDelete = function(id) {
      var modalOptions = {
        closeButtonText: '取消',
        actionButtonText: '确定',
        headerText: '确认',
        bodyText: '确定要删除吗？'
      };

      MessageBoxService.showModal({}, modalOptions).then(function(result) {
        Word.$find(id).$then(function(object) {
          object.$destroy().$then(function() {
            toaster.pop('success', "", "删除成功");
            refresh();
          });
        })
      });
    };

  }
]);
