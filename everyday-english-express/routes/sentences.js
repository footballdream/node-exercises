var db = require('../models')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {      
  db.Sentence.findAll({
  }).success(function(sentences) {
    res.render('sentences', {
      title: 'Sentences',
      sentences: sentences
      })
  })
});

module.exports = router;
