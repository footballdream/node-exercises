/**
 * SentenceController
 *
 * @description :: Server-side logic for managing sentences
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    Sentence.find(function(err, sentences){
      if (err) return res.send(err, 500);
      res.view('sentence/index', {
          model: sentences
      });
    });
  },
    
  'new': function(req, res) {
    res.view('sentence/new');
  },

  create: function(req, res) {
  	var params = _.extend(req.query || {}, req.params || {}, req.body || {});
  	Sentence.create(params, function sentenceCreated (err, createdSentence) {
  		if (err) return res.send(err, 500);
  		res.redirect('/sentence/show/'+ createdSentence.id);
  	});
  },

  show: function (req, res) {  	
  	var id = req.param('id');
  	if (!id) return res.send("No id specified.", 500);
  	Sentence.findOne(id, function sentenceFound(err, sentence) {
  		if (err) return res.sender(err, 500);
  		if (!sentence) return res.send("Sentence " + id + " not found", 404);

  		res.view('sentence/show', {
  			obj: sentence
  		})
  	});
  },

  edit: function (req, res) {
    var id = req.param('id');    
    if (!id) return res.send("No id specified.", 500);
    Sentence.findOne(id, function sentenceFound (err, obj){
      if (err) return res.send(err, 500);
      if (!obj) return res.send("Sentence " + id + " not found", 404);
      
      res.view('sentence/edit', {
  			sentence: obj
      })
    });
  },
  
  update: function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    var id = params.id;    
    if (!id) return res.send("No id specified.", 500);

    Sentence.update(id, params, function sentenceUpdated(err, updatedSentence) {
      if (err) {
        res.redirect('/sentence/edit');
      }
      if(!updatedSentence) {
        res.redirect('/sentence/edit');
      }
      res.redirect('/sentence/show/' + id);
    });
  },
	
  destroy: function (req, res) {
      var id = req.param('id');
      if (!id) return res.send("No id specified.",500);
  
      Sentence.find(id, function foundUser(err, sentence) {
          if (err) return res.send(err, 500);
          if (!sentence) return res.send("No user with that id exists.", 404);
  
          Sentence.destroy(id, function sentenceDestroyed(err) {
              if (err) return res.send(err, 500);
              return res.redirect('/sentence');
          });			
      })
  },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to SleepController)
     */
    _config: {}
};

