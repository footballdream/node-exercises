
var router = require('express').Router();
var db = require('../../models');
var utils = require('../../lib/utils');

router.route('/')
  // get all sentences
  .get(function(req, res) {
    var p = utils.defaultCollectionQueryParams(req);    
    db.Sentence.findAndCountAll({
     attributes: ['id', 'english', 'chinese'],
     offset: (p.page - 1) * p.perPage,
     limit: p.perPage,
     order: p.sortStr
    }).success(function(sentences) {
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

