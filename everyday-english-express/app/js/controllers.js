'use strict';

var controllersModule = angular.module('app.controllers', ['ngRoute', 'app.services']);

// Signin Controller
appModule.controller('SigninController', ['$scope', '$location', 'SigninService',
    function ($scope, $location, SigninService) {
        $scope.session = {
            showMessage: false,
            message: ''};
        $scope.signin = function () {
            console.log('userName=' + $scope.session.username + ", password=" + $scope.session.password)
            SigninService.signin($scope.session.username, $scope.session.password).then(function (data) {
                if (201 == data.returnCode) {
                    $location.path('/sentences')
                } else {
                    console.log('signin failed, userName=' + $scope.session.username);
                    $scope.session.showMessage = true;
                    $scope.session.message = '用户名或密码错误。';
                }
            });
        };
    }]);

// sentence控制器
appModule.controller('SentencesUpdateController', ['$scope', '$location', '$routeParams', 'SentencesRest',
    function ($scope, $location, $routeParams, SentencesRest) {
        $scope.manipulationName = '修改';

        SentencesRest.get($routeParams.id).then(function (sentence) {
            $scope.sentence = sentence
        });

        $scope.save = function () {
            SentencesRest.update($scope.sentence);
            $location.path('/sentences')
        };

        $scope.cancel = function () {
            $location.path('/sentences');
        };
    }]);

// sentence控制器
appModule.controller('SentencesNewController', ['$scope', '$location', 'SentencesRest',
    function ($scope, $location, SentencesRest) {

        $scope.manipulationName = '新建';
        $scope.save = function () {
            SentencesRest.create($scope.sentence);
            $location.path('/sentences')
        };
        $scope.cancel = function () {
            $location.path('/sentences');
        };
    }]);

// sentence控制器
appModule.controller('SentencesController', ['$scope', '$location', 'SentencesRest', 'MessageBoxService', function ($scope, $location, SentencesRest, MessageBoxService) {
    $scope.pagesCurrent = 1;
    $scope.pagesTotalPages = 1;
    $scope.sortField = 'id';
    $scope.sortReverse = false;


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
}]);


// category 控制器
appModule.controller('CategoriesController', ['$scope', '$location', 'CategoriesRest', 'MessageBoxService', function ($scope, $location, CategoriesRest, MessageBoxService) {
    $scope.pagesCurrent = 1;
    $scope.pagesTotalPages = 1;
    $scope.sortField = 'id';
    $scope.sortReverse = false;


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
        $location.path('/categories/' + id);
    };

    $scope.showNew = function () {
        $location.path('/categories/new');
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
            CategoriesRest.delete(id)
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
        CategoriesRest.query(pageIndex, $scope.sortField, $scope.sortReverse).then(function (page) {
            $scope.categories = page.data
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
}]);

// 目录控制器-创建
appModule.controller('CategoriesNewController', ['$scope', '$location', 'CategoriesRest', 'CategoriesTreeService',
    function ($scope, $location, CategoriesRest, CategoriesTreeService) {
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
                 $scope.category.parent_id= $scope.selectedParent.id;
                 $scope.category.parent_name= $scope.selectedParent.name;
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
            CategoriesRest.create($scope.category);
            $location.path('/categories')
        };

        $scope.cancel = function () {
            $location.path('/categories');
        };


    }]);

// 目录控制器-修改
appModule.controller('CategoriesUpdateController', ['$scope', '$location', '$routeParams', 'CategoriesRest',
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
