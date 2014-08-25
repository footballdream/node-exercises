var log4js = require('log4js');
log4js.configure('../log4js.json', {});
var logger = log4js.getLogger('client');

var PORT = 4888;
var HOST = '10.8.9.42';

var hexy = require('hexy');
var util = require('util');
var commands = require('./commands');

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on('listening', function () {
  var address = server.address();
  logger.info('agent client listening on ' + address.address + ":" + address.port);  
});

server.on('message', function (message, remote) {
  var logger = log4js.getLogger('receiver');
  logger.debug('received data, peer=' + remote.address + ':' + remote.port 
      + ', length=' + message.length + ', content=\n' + hexy.hexy(message));
  logger.debug('parsed message, command=\n'+ util.inspect(commands.parse(message, 0), false, null));
});

server.bind(PORT, HOST);
