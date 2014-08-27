"use strict";

exports.defaultCollectionQueryParams = function(req) {
  var params = {};
  params.page = parseInt(req.query.page) || 1;
  params.perPage = parseInt(req.query.perPage) || 10;
  params.sortAttr = req.query.sortAttr || 'id';
  params.sortDirection = req.query.sortDirection || 'asc';
  params.sortStr = params.sortAttr + ' ' + params.sortDirection;  
  return params;
  };
