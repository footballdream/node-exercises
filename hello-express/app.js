var express = require('express');
var morgan  = require('morgan') // https://github.com/expressjs/morgan

var app = express();
app.use(morgan('combined'));
/*
// 日志中间件，类似 Ruby Rack 的中间件
logger = morgan(function (req, res) {
  return req.method + ' ' + req.url
});
app.use(logger);
*/

// curl http://localhost:3000/hello.txt
app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

// curl -X PUT http://localhost:3000/ -d 'name=admin'
app.put('/', function(req, res) {
  res.contentType('json');
  res.send(JSON.stringify({ status:"success" }));
});

var port = process.env.PORT || 3000;

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
