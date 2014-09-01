'use strict';
var module = angular.module('app.services');
module.factory('SentencesRest', ['$http', 'TokenHandler', function ($http, TokenHandler) {
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
