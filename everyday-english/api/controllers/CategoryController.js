/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categorys
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
[{"label":"赖世雄经典语法","id":10001,"parent_id":null,"name":"赖世雄经典语法","description":null,"children":[{"label":"第一章","id":10002,"parent_id":10001,"name":"第一章","description":null,"children":[{"label":"第一节","id":10003,"parent_id":10002,"name":"第一节","description":null,"children":[]}]}]}]
    **/

  asTree: function(req, res, next) {
    var options = {};
    Category.find(options, function(err, objects) {
      if (undefined === objects) {
        return res.notFound();
      }
      if (err) {
        return next(err);
      }
      res.json(buildTree(objects));
    });

    function buildTree(objects) {
      if (undefined == objects || 0 == objects.length) {
        return [];
      }
      var map = {}, node, roots = [];
      for (var i = 0; i < objects.length; i += 1) {
        node = objects[i];
        delete node.createdAt;
        delete node.updatedAt;
        node.parentId = node.getParentId();
        node.label = node.name;
        node.children = [];
        map[node.id] = i; // use map to look-up the parents
        if (undefined !== node.parentId) {
          objects[map[node.parentId]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    }
  },

  // a FIND ONE action
  findOne: function(req, res, next) {
    var id = req.param('id');
    Category.findOne(id, function(err, Category) {
      if (undefined === Category) {
        return res.notFound();
      }
      if (err) {
        return next(err);
      }
      return res.json(Category);
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
      Category.findOne(id, function(err, Category) {
        if (undefined === Category) {
          return res.notFound();
        }
        console.log(Category);
        if (err) {
          return next(err);
        }
        return res.json([]);
      });
    } else {
      var options = getOptions(req);
      var where = options['where'];
      Category.count().where(where).exec(
        function(err, count) {
          if (err) {
            return next(err);
          }
          if (0 >= count) {
            setPageHeader(res, options, 0);
            return res.json([]);
          }
          Category.find(options, function(err, Categorys) {
            if (undefined === Categorys) {
              return res.notFound();
            }
            if (err) {
              return next(err);
            }
            setPageHeader(res, options, count);
            res.json(Categorys);
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
        where: where || undefined
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


    // a CREATE action
    create: function(req, res, next) {
        var params = req.params.all();
        var parentId = req.param('parent_id')
        if(parentId) {
          Category.findOne(parentId, function(err, category) {
            if (undefined === category) {
              return res.notFound();
            }
            if (err) {
              return next(err);
            }
            if (category.ancestry) {
              params.ancestry = category.ancestry + '/' + category.id;
            }else {
              params.ancestry = category.id;
            }
            Category.create(params, function(err, created) {
                if (err) return next(err);
                res.status(201);
                res.json(created);
            });
        });
        } else {
          Category.create(params, function(err, Category) {
            if (err) return next(err);
            res.status(201);
            res.json(Category);
          });
        }
    },
/*


    // an UPDATE action
    update: function(req, res, next) {
        var criteria = {};
        criteria = _.merge({}, req.params.all(), req.body);
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        Category.update(id, criteria, function(err, Category) {
            if (Category.length === 0) return res.notFound();
            if (err) return next(err);
            res.json(Category);
        });
    },

    // a DESTROY action
    destroy: function(req, res, next) {
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        Category.findOne(id).exec(function(err, result) {
            if (err) return res.serverError(err);
            if (!result) return res.notFound();
            Category.destroy(id, function(err) {
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
