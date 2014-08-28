
var router = require('express').Router();
var db = require('../../models');
var utils = require('../../lib/utils');

// get all sentences
router.get('/', function(req, res) {
  var p = utils.defaultCollectionQueryParams(req);    
  db.Sentence.findAndCountAll({
    attributes: ['id', 'english', 'chinese'],
    offset: (p.page - 1) * p.perPage,
    limit: p.perPage,
    order: p.sortStr
  }).success(function(sentences) {
    res.json(sentences);
  });
});

// get a sentence
router.get('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  db.Sentence.find({
    where: {id: id},
    attributes: ['id', 'english', 'chinese']
  }).success(function(sentence) {
    res.json(sentence);
  });
});

// update a sentence
router.put('/:id', function(req, res) {
  var id = parseInt(req.params.id);
  db.Sentence.find(id).success(function(sentence) {
    sentence.updateAttributes(req.body)
    .success(function(sentence) {
      res.json(sentence);
    });    
  });
});

// create a sentence
router.post('/', function(req, res) {
  db.Sentence.create(req.body)
  .success(function(sentence) {
    res.json(sentence);
  });
});

// delete a sentence
router.delete('/:id', function(req, res) {
  var id = parseInt(req.params.id);
  db.Sentence.find(id).success(function(sentence) {
    sentence.destroy()
    .success(function() {
      res.json({code: 0, message: 'success'});
    });    
  });
});

module.exports = router;

