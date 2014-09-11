var log4js = require('log4js');
log4js.configure('log4js.json', {});
var logger = log4js.getLogger('server');

var PORT = 2103;
var HOST = '0.0.0.0';

var hexy = require('hexy');
var util = require('util');
var commands = require('./commands');

var net = require('net');
var server = net.createServer({ 
  fd: null,
  allowHalfOpen: false,
  readable: false,
  writable: false
});
server.on('listening', function () {
  var address = server.address();
  logger.info('data server started successfully, listening on ' + address.address + ":" + address.port);
});

server.on('connection', function(socket) {
  var client = socket.remoteAddress + ':' + socket.remotePort;
  var logger = log4js.getLogger(client);
  var clientInfo = 'client=' + client;
  logger.debug('new client connected');
  
  socket.on('data', function (message) {
    logger.debug('received data, length=' + message.length + ', bytes=\n' + hexy.hexy(message));
  });
  
  socket.on('close', function(had_error) {
    logger.error('client closed, had_error=' + had_error);
  });   
  
  socket.on('error', function(error) {
    logger.error('client error, error=' + error);
  });     
  
  socket.on('end', function() {
    logger.debug('client ended');
  });    
});

server.on('error', function(error) {
  logger.error('data server error, error=' + error);
});

server.on('close', function() {
  logger.info('data server closed'); 
});

server.listen(PORT, HOST);
