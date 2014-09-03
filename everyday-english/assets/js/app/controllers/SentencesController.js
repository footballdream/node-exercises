'use strict';
var module = angular.module('app.controllers');
// sentence控制器
module.controller('SentencesController', ['$scope', '$location', 'Sentence', 'MessageBoxService', function ($scope, $location, Sentence, MessageBoxService) {
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

    $scope.filteredSentences = [];
    $scope.pageMaxShowing = 5;
    $scope.pagePerPage = 10;
    $scope.pagePage = 1;
    $scope.pageTotal = 0;
    $scope.pageTotalPages = 1;

    $scope.updatePageInfo = function() {
      var minIndex = (0 != $scope.pageTotal)
        ? Math.max(($scope.pagePerPage * ($scope.pagePage - 1)) + 1, 1)
        : 0;
      var maxIndex = Math.min($scope.pagePerPage * $scope.pagePage, $scope
        .pageTotal)
      $scope.pageInfo = "显示" + minIndex + "到" + maxIndex + "，共" + $scope.pageTotal

    };

    $scope.$watch('pagePage', function() {
        var options = {
          skip: (($scope.pagePage - 1) * $scope.pagePerPage),
          limit: $scope.pagePerPage
        };
        Sentence.$search(options).$then(function(sentences) {
          $scope.pageTotal = sentences.$pageTotal;
          $scope.pageTotalPages = sentences.$pageTotalPages;
          $scope.filteredSentences = sentences;
          $scope.updatePageInfo();
        })
      });
}]);
