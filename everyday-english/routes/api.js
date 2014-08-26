var express = require('express');
var router = express.Router();
var db = require('../models')
var ver = '1.0.0';

router.route('/' + ver + '/sentences')
  // get all sentences
  .get(function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = parseInt(req.query.perPage) || 10;
    var sortAttr = req.query.sortAttr || 'id';
    var sortDirection = req.query.sortDirection || 'asc';
    var sortStr = sortAttr + ' ' + sortDirection;
    
    db.Sentence.findAndCountAll({
     attributes: ['id', 'english', 'chinese'],
     offset: (page - 1) * perPage,
     limit: perPage,
     order: sortStr
    }).success(function(sentences) {
      res.contentType('application/json;charset=utf-8');
      res.json(sentences);
    });
  })

  .put(function(req, res) {
    res.json({a: 'a', b: 'b'});
  })
  .post(function(req, res) {
    res.json({a: 'a', b: 'b'});
  })
  .delete(function(req, res) {
    res.json({a: 'a', b: 'b'});
  });

module.exports = router;
