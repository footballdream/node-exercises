var router = require('express').Router();

// 设置响应头为JSON及编码为utf-8
router.use(function(req, res, next) {
  res.contentType('application/json;charset=utf-8');
  return next();
});

var defaultVer = '1.0.0';
var defaultShortVer = 'v1';
var sentences = require('./sentences');
router.use('/' + defaultVer + '/sentences', sentences);
router.use('/' + defaultShortVer + '/sentences', sentences);

module.exports = router;
