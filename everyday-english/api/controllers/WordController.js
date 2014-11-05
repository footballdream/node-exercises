/**
 * WordController
 *
 * @description :: Server-side logic for managing words * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // a FIND ONE action
  findOne: function(req, res, next) {
    var id = req.param('id');
    Word.findOne().where({ id: id }).populate('category').exec(function(err, object) {
      if (undefined === object) {
        return res.notFound();
      }
      if (err) {
        return next(err);
      }
      return res.json(object);
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
      Word.findOne(id, function(err, object) {
        if (undefined === object) {
          return res.notFound();
        }
        console.log(object);
        if (err) {
          return next(err);
        }
        return res.json([]);
      });
    } else {
      var options = getOptions(req);
      var where = options['where'];
      if (where) {
        where =  JSON.parse(where);
      }
      Word.count().where(where).exec(
        function(err, count) {
          if (err) {
            return next(err);
          }
          if (0 >= count) {
            setPageHeader(res, options, 0);
            return res.json([]);
          }
          Word.find(options, function(err, objects) {
            if (undefined === objects) {
              return res.notFound();
            }
            if (err) {
              return next(err);
            }
            setPageHeader(res, options, count);
            res.json(objects);
          });
        });
    }

    function setPageHeader(res, options, count) {
      var limit = parseInt(options['limit'], 10);
      var skip = parseInt(options['skip'], 10);
      // skip需要是limit的整数倍，否则计算当前页会出错，但该错不误产生较大影响，不处理
      var page = 0 >= count ? 0 : (Math.ceil(skip / limit) + 1);
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
        where: req.param('where') || undefined
      };
      return options;
    }

    function isShortcut(id) {
      if (id === 'find' || id === 'update' || id === 'create' || id ===
        'destroy') {
        return true;
      }
    }
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SleepController)
   */
  _config: {}
};
