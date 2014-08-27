'use strict';

var servicesModule = angular.module('app.services', ['ngResource', 'ngCookies']);

servicesModule.service('MessageBoxService', ['$modal', function ($modal) {
    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '/partials/messagebox.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            }
        }

        return $modal.open(tempModalDefaults).result;
    };

}]);


servicesModule.factory('TokenHandler', ['$cookies', '$cookieStore', function ($cookies, $cookieStore) {
    var tokenHandler = {};
    var token = "none";
    if (undefined == $cookies.token) {
        console.log('init token, token=none')
        token = "none";
    } else {
        token = $cookies.token;
        console.log('init token, token=' + token)
    }

    tokenHandler.set = function (newToken) {
        token = newToken;
        $cookies.token = newToken;
        console.log('setToken:' + newToken);
    };

    tokenHandler.get = function () {
        console.log('getToken:' + token);
        return token;
    };

    // wrap given actions of a resource to send auth token with every
    // request
    tokenHandler.wrapActions = function (resource, actions) {
        // copy original resource
        var wrappedResource = resource;
        for (var i = 0; i < actions.length; i++) {
            tokenWrapper(wrappedResource, actions[i]);
        }
        ;
        // return modified copy of resource
        return wrappedResource;
    };

    // wraps resource action to send request with auth token
    var tokenWrapper = function (resource, action) {
        // copy original action
        resource['_' + action] = resource[action];
        // create new action wrapping the original and sending token
        resource[action] = function (data, success, error) {
            return resource['_' + action](
                angular.extend({}, data || {}, {access_token: tokenHandler.get()}),
                success,
                error
            );
        };
    };

    return tokenHandler;
}]);

servicesModule.factory('SigninService', ['$http', 'TokenHandler', function ($http, TokenHandler) {
    var service = {
        signin: function (userName, userPwd) {
            console.log('userName=' + userName + ", password=" + userPwd)
            var url = "/everyday/api/1.0.0/auth/signin"
            var promise = $http.post(url, { name: userName, password: userPwd}).then(function (response) {
                var data = {};
                data = response.data;
                data.returnCode = response.status;
                if (201 == data.returnCode) {
                    TokenHandler.set(data.token)
                } else {
                    TokenHandler.set(null)
                }
                return data;
            });
            return promise;
        },
        signout: function (token) {
            var url = "/everyday/api/1.0.0/auth/signout"
            var promise = $http.get(url, {}).then(function (response) {
                var sentence = response.data;
                return sentence;
            });
            return promise;
        }
    };
    return service;
}]);

servicesModule.factory('SentencesRest', ['$http', 'TokenHandler', function ($http, TokenHandler) {
    var service = { query: function (pageIndex, sortField, sortReverse) {
        var url = "/everyday/api/1.0.0/sentences"
        var sortDirection = sortReverse ? 'desc' : 'asc'
        var promise = $http.get(url, { params: { page: pageIndex, per_page: 9, sort_field: sortField, sort_direction: sortDirection, token: TokenHandler.get()} }).then(function (response) {
            var page = {};
            page.data = response.data;
            page.totalPages = parseInt(response.headers('X-Total-Pages'));
            page.totalRecords = parseInt(response.headers('X-Total'));
            page.currentPage = parseInt(response.headers('X-Page'));
            page.perPage = parseInt(response.headers('X-Per-Page'));
            return page;
        });
        return promise;
    },
        get: function (id) {
            var url = "/everyday/api/1.0.0/sentences/" + id;
            var promise = $http.get(url, {params: {token: TokenHandler.get()}}).then(function (response) {
                var sentence = response.data;
                return sentence;
            });
            return promise;
        },
        delete: function (id) {
            var url = "/everyday/api/1.0.0/sentences/" + id;
            var promise = $http.delete(url, {params: {token: TokenHandler.get()}}).then(function (response) {
                var sentence = response.data;
                return sentence;
            });
            return promise;
        },
        update: function (sentence) {
            var url = "/everyday/api/1.0.0/sentences/" + sentence.id
            sentence.token = TokenHandler.get();
            var promise = $http.put(url, sentence).then(function (response) {
                var data = response.data;
                console.log(data)
                return data;
            });
            return promise;
        },
        create: function (sentence) {
            var url = "/everyday/api/1.0.0/sentences"
            sentence.token = TokenHandler.get();
            var promise = $http.post(url, sentence).then(function (response) {
                var data = response.data;
                console.log(data)
                return data;
            });
            return promise;
        }
    }
    return service;
}]);

servicesModule.factory('CategoriesRest', ['$http', 'TokenHandler', function ($http, TokenHandler) {
    var service = {
        query: function (pageIndex, sortField, sortReverse) {
            var url = "/everyday/api/1.0.0/categories"
            var sortDirection = sortReverse ? 'desc' : 'asc'
            var promise = $http.get(url, { params: { page: pageIndex, per_page: 9, sort_field: sortField, sort_direction: sortDirection, token: TokenHandler.get()} }).then(function (response) {
                var page = {};
                page.data = response.data;
                page.totalPages = parseInt(response.headers('X-Total-Pages'));
                page.totalRecords = parseInt(response.headers('X-Total'));
                page.currentPage = parseInt(response.headers('X-Page'));
                page.perPage = parseInt(response.headers('X-Per-Page'));
                return page;
            });
            return promise;
        },
        get: function (id) {
            var url = "/everyday/api/1.0.0/categories/" + id;
            var promise = $http.get(url, {params: {token: TokenHandler.get()}}).then(function (response) {
                var sentence = response.data;
                return sentence;
            });
            return promise;
        },
        tree: function () {
            var url = "/everyday/api/1.0.0/categories/tree";
            var promise = $http.get(url, {params: {token: TokenHandler.get()}}).then(function (response) {
                var data = response.data;
                return data;
            });
            return promise;
        },
        delete: function (id) {
            var url = "/everyday/api/1.0.0/categories/" + id;
            var promise = $http.delete(url, {params: {token: TokenHandler.get()}}).then(function (response) {
                var sentence = response.data;
                return sentence;
            });
            return promise;
        },
        update: function (category) {
            var url = "/everyday/api/1.0.0/categories/" + category.id
            category.token = TokenHandler.get();
            var promise = $http.put(url, category).then(function (response) {
                var data = response.data;
                console.log(data)
                return data;
            });
            return promise;
        },
        create: function (category) {
            var url = "/everyday/api/1.0.0/categories"
            category.token = TokenHandler.get();
            var promise = $http.post(url, category).then(function (response) {
                var data = response.data;
                console.log(data)
                return data;
            });
            return promise;
        }
    }
    return service;
}]);

servicesModule.service('CategoriesTreeService', ['$modal', function ($modal) {
    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '/partials/categories/tree.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    console.log(customModalOptions);
                    customModalOptions.ok();
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            }
        }

        return $modal.open(tempModalDefaults).result;
    };

}]);

