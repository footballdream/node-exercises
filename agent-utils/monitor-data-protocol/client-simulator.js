"use strict";
var log4js = require('log4js');
log4js.configure('log4js.json', {
  reloadSecs: 60
});
var logger = log4js.getLogger('client');


var server = '127.0.0.1';
var serverPort = 2103;

var options = {
  allowHalfOpen: false,
  host: server,
  port: serverPort,
  localAddress: '127.0.0.1',
  localPort: 2103
};
var net = require('net');
var client = net.createConnection(options, function() {
  logger.info('client socket connected to ' + server + ":" + serverPort);
});

client.on('error', function(error) {
  var text = 'client socket error';
  if ('EADDRINUSE' == error.code) {
    text += ', address in use';
  } else if ('ECONNREFUSED' == error.code) {
    text += ', connection refused';
  }
  text += ', details=' + error;
  logger.error(text);
});

var hexy = require('hexy');
var util = require('util');
var messages = require('./messages');
var receiverLogger = log4js.getLogger('receiver');
client.on('data', function(data) {
  receiverLogger.debug('received data, length=' + data.length + ', bytes=\n' +
    hexy.hexy(data));
});

client.on('close', function(had_error) {
  logger.info('client socket closed and process will exit, had_error=' +
    had_error);
  process.exit();
});
