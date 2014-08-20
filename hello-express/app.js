var express = require('express');
var morgan  = require('morgan') // https://github.com/expressjs/morgan
var path = require('path');
var mysql = require('mysql');

var app = express();
app.use(morgan('combined'));
/*
// 日志中间件，类似 Ruby Rack 的中间件
logger = morgan(function (req, res) {
  return req.method + ' ' + req.url
});
app.use(logger);
*/

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  port     : 3366
});
connection.query('USE everyday_development');

app.set('port',  process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/sentences', function(req, res){
  connection.query('SELECT * FROM sentences', function(err, rows){
    res.render('sentences', {sentences : rows});
  });
});

// curl http://localhost:3000/hello.txt
app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

// curl -X PUT http://localhost:3000/ -d 'name=admin'
app.put('/', function(req, res) {
  res.contentType('json');
  res.send(JSON.stringify({ status:"success" }));
});

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port %d', server.address().port);
});
