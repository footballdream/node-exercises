/**
 * SentenceController
 *
 * @description :: Server-side logic for managing sentences
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /*
  index: function (req, res) {
    Sentence.find(function(err, sentences){
      if (err) return res.send(err, 500);
      res.view({
          model: sentences
      });
    });
  },
    
  'new': function(req, res) {
    res.view();
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

  		res.view({
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
      
      res.view({
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
	*/
    // a CREATE action  
    create: function(req, res, next) {
        var params = req.params.all();
        Sentence.create(params, function(err, sentence) {
            if (err) return next(err);
            res.status(201);
            res.json(sentence);
        });
    },

    // a FIND action
    find: function(req, res, next) {
        var id = req.param('id');
        var idShortCut = isShortcut(id);
        if (idShortCut === true) {
            return next();
        }
        if (id) {
            Sentence.findOne(id, function(err, sentence) {
                if (sentence === undefined) return res.notFound();
                if (err) return next(err);
                res.json(sentence);
            });
        } else {
            var where = req.param('where');
            if (_.isString(where)) {
                where = JSON.parse(where);
            }
            var options = {
                limit: req.param('limit') || undefined,
                skip: req.param('skip') || undefined,
                sort: req.param('sort') || undefined,
                where: where || undefined
            };
            Sentence.find(options, function(err, sentence) {
                if (sentence === undefined) return res.notFound();
                if (err) return next(err);
                res.json(sentence);
            });
        }

        function isShortcut(id) {
            if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
                return true;
            }
        }
    },

    // an UPDATE action
    update: function(req, res, next) {
        var criteria = {};
        criteria = _.merge({}, req.params.all(), req.body);
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        Sentence.update(id, criteria, function(err, sentence) {
            if (sentence.length === 0) return res.notFound();
            if (err) return next(err);
            res.json(sentence);
        });
    },

    // a DESTROY action
    destroy: function(req, res, next) {
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        Sentence.findOne(id).exec(function(err, result) {
            if (err) return res.serverError(err);
            if (!result) return res.notFound();
            Sentence.destroy(id, function(err) {
                if (err) return next(err);
                return res.json(result);
            });
        });
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to SleepController)
     */
    _config: {}
};
