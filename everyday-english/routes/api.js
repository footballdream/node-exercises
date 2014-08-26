var express = require('express');
var router = express.Router();
var db = require('../models')
var ver = '1.0.0';

router.route('/' + ver + '/sentences')
  // get all sentences
  .get(function(req, res) {
    db.Sentence.findAndCountAll({
     offset: 0,
     limit: 2        
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
