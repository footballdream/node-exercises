/**
 * API Bound Models for AngularJS
 * @version v0.18.0 - 2014-08-26
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
/**
 * @mixin PagedModel
 *
 * @description Extracts header paging information into the `$page` and `$pageCount` properties.
 *
 * Usage:
 *
 * Just add mixin to a model's mixin chain
 *
 * ```javascript
 * var Bike = restmod.model('api/bikes', 'PagedModel');
 * ```
 *
 * Then using fetch on a collection bound to a paged api should provide page information
 *
 * ```javascript
 * Bike.$search().$then(function() {
 *   console.log this.$page; // should print the current page number.
 *   console.log this.$pageCount; // should print the request total page count.
 * });
 * ```
 *
 * Paging information is extracted from the 'X-Page' and the 'X-Page-Total' headers, to use different headers just
 * override the $pageHeader or the $pageCountHeader definition during model building.
 *
 * ```javascript
 * restmod.model('PagedModel', function() {
 *  this.define('$pageHeader', 'X-My-Page-Header');
 * })
 * ```
 *
 */

angular.module('restmod').factory('PagedModel', ['restmod', function(restmod) {

  return restmod.mixin({
    '@$pageCurrentHeader': 'X-Page',
    '@$pageTotalHeader': 'X-Total-Pages',
    '@$pagePerPageHeader': 'X-Per-Page',
    '@$pageTotalItemsHeader': 'X-Total',
    
    '~afterFetchMany': function(_response) {
      var current = _response.headers(this.$pageCurrentHeader);
      var total = _response.headers(this.$pageTotalHeader);
      var perPage = _response.headers(this.$pagePerPageHeader);
      var totalItems = _response.headers(this.$pageTotalItemsHeader);

      this.$pageCurrent = (current !== undefined ? parseInt(current, 10) : 1);
      this.$pageTotal = (total !== undefined ? parseInt(total, 10) : 1);
      this.$pagePerPage = (perPage !== undefined ? parseInt(perPage, 10) : 10);
      this.$pageTotalItems = (totalItems !== undefined ? parseInt(totalItems, 10) : 0);
    }
  });
}]);})(angular);