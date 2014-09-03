/**
 * SentenceController
 *
 * @description :: Server-side logic for managing sentences
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // a FIND action
  find: function(req, res, next) {
    var id = req.param('id');
    var idShortCut = isShortcut(id);
    if (idShortCut === true) {
      return next();
    }

    if (id) {
      Sentence.findOne(id, function(err, sentence) {
        if (undefined === sentence) {
          return res.notFound();
        }
        if (err) {
          return next(err);
        }
        res.json(sentence);
      });
    } else {
      var options = getOptions(req);
      var where = options['where'];
      Sentence.count().where(where).exec(
        function(err, count) {
          if (err) {
            return next(err);
          }
          if (0 >= count) {
            setPageHeader(res, options, 0);
            return res.json([]);
          }
          Sentence.find(options, function(err, sentences) {
            if (undefined === sentences) {
              return res.notFound();
            }
            if (err) {
              return next(err);
            }
            setPageHeader(res, options, count);
            res.json(sentences);
          });
        });
    }

    function setPageHeader(res, options, count) {
      var limit = parseInt(options['limit'], 10);
      var skip = parseInt(options['skip'], 10);
      // skip需要是limit的整数倍，否则计算当前页会出错，但该错不误产生较大影响，不处理
      var page =  0 >= count ? 0 : (Math.ceil(skip / limit) + 1);
      res.set('X-Total-Pages', Math.ceil(count / limit));
      res.set('X-Total', count);
      res.set('X-Page', page);
      res.set('X-Per-Page', limit);
    }

    function getOptions(req) {
      var where = req.param('where');
      if (_.isString(where)) {
        where = JSON.parse(where);
      }
      var options = {
        limit: req.param('limit') || 10,
        skip: req.param('skip') || 0,
        sort: req.param('sort') || undefined,
        where: where || undefined
      };
      return options;
    }

    function isShortcut(id) {
      if (id === 'find' || id === 'update' || id === 'create'
        || id === 'destroy') {
        return true;
      }
    }
  },
  /*
    // a CREATE action
    create: function(req, res, next) {
        var params = req.params.all();
        Sentence.create(params, function(err, sentence) {
            if (err) return next(err);
            res.status(201);
            res.json(sentence);
        });
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
*/
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SleepController)
   */
  _config: {}
};
