var log4js = require('log4js');
log4js.configure('../log4js.json', {});
var logger = log4js.getLogger('client');

var PORT = 4888;
var HOST = '0.0.0.0';

var hexy = require('hexy');
var util = require('util');
var commands = require('./commands');

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on('listening', function () {
  var address = server.address();
  logger.info('agent client started, listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
  var logger = log4js.getLogger('receiver');
  command = commands.parse(message, 0);
  str = 'command=\n'+ util.inspect(command, false, null);
  logger.debug('received data, peer=' + remote.address + ':' + remote.port
      + ', length=' + message.length + ', bytes=\n' + hexy.hexy(message) + str);
});

server.bind(PORT, HOST);
