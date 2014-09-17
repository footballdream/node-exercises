"use strict";
var iconv = require('iconv-lite');
iconv.extendNodeEncodings();

var log4js = require('log4js');
log4js.configure('log4js.json', {
  reloadSecs: 60
});
var logger = log4js.getLogger('client');


var server = '172.18.17.67';
// var server = '127.0.0.1';
var serverPort = 2103;

var options = {
  allowHalfOpen: false,
  host: server,
  port: serverPort,
  // localAddress: '127.0.0.1',
  // localPort: 2103
};
var net = require('net');
var Frap = require('./frap')
var hexy = require('hexy');
var internal = require('./inernalUtils');
var client = net.createConnection(options, function() {
  logger.info('client socket connected to ' + server + ":" + serverPort);
  var frap = new Frap(client);
  var frameLogger = log4js.getLogger('receiver');
  frap.on('header', function(framelen, typeId, serial, id) {
     // frameLogger.debug("get a frame header, typeId=" + typeId + ", serial=" + serial + ", id=" + id + ", dataLength=" + framelen);
  }); 
  var BinaryProtocol = require('./binary-protocol');
  var protocol = new BinaryProtocol();

// define a type called 'Bytes', which is simply
// a series of raw bytes prefixed by length.
protocol.define('Bytes', {
  read: function (propertyName) {
    this
    .pushStack({length: null, value: null}) // allocate a new object to read the data into.
    .Int32BE('length') // read a 32 bit integer into the `length` property.
    .tap(function (data) {
      if (data.length === -1) {
        // if the length is -1, then there are no bytes and the value is null.
        data.value = null;
        return;
      }
      this.raw('value', data.length); // read N bytes into a property called `value`
    })
    .popStack(propertyName, function (data) {
      // pop the interim value off the stack and insert the real value into `propertyName`
      return data.value;
    });
  },
  write: function (value) {
    if (value === null) {
      this.Int32BE(-1); // a length of -1 indicates a null value.
    }
    else {
      // value is a buffer
      this
      .Int32BE(value.length) // write the buffer length
      .raw(value); // write the raw buffer
    }
  }
});  
  
// define a type called `String`, which is encoded as a length
// prefixed series of bytes.
protocol.define('String', {
  read: function (propertyName) {
    this
    .Bytes(propertyName) // read `Bytes` into the property name.
    .collect(function (data) {
      // collect the final data to return
      if (data[propertyName] !== null) {
        data[propertyName] = data[propertyName].toString('utf8');
      }
      return data;
    });
  },
  write: function (value) {
    this.Bytes(new Buffer(value, 'utf8'));
  }
});  
  frap.on('data', function(data, typeId, id, serial) {
     //var msg = util.format('get a frame, typeId=%d, id=%d, serial=%d, frameLength=%d', typeId, id, serial, data.length);
     //frameLogger.debug(msg);
     if(messages.MessageTypeIds.MSG_TYPE_HEART === typeId 
         && messages.MessageIds.COMM_TYPE_SERVER_HANDSHAKE) {
          var msg = util.format('get a frame, typeId=%d, id=%d, serial=%d, frameLength=%d', typeId, id, serial, data.length);
          frameLogger.debug(msg);
          var buf = new Buffer(13);
          var index = 0;
          buf.writeUInt32BE(typeId, index);
          index += 4;
          buf.writeUInt8(serial, index);
          index += 1;
          buf.writeUInt32BE(id, index);
          index += 4;
          buf.writeUInt32BE(0, index);
          client.write(buf);
       }
    if (60 !== data.length) {
      // frameLogger.debug('get a frame, bytes=\n' +  hexy.hexy(data));
    }
    else {
      var reader = protocol.createReader(data);
      reader.UInt32BE('deviceType')
            .raw('deviceName', 50)
            .UInt8("onlineStatus")
            .raw('skip', 1)
            .UInt32BE('onlineTerminalCount');
      var info = reader.next();
      info.deviceName = internal.cppString2JsString(info.deviceName, 0);
      // console.info(info);
    }
  });     
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

var util = require('util');
var messages = require('./messages');
var receiverLogger = log4js.getLogger('receiver');
client.on('data', function(data) {
  //receiverLogger.debug('received data, length=' + data.length);// + ', bytes=\n' +
    // hexy.hexy(data));
    //messages.parseMessage(data);
});

client.on('close', function(had_error) {
  logger.info('client socket closed and process will exit, had_error=' +
    had_error);
  process.exit();
});


