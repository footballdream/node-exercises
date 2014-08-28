/**
 * SentenceController
 *
 * @description :: Server-side logic for managing sentences
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  
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
