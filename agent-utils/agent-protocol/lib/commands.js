"use strict";

var ies = require('./ies');
var ineternal = require('./inernalUtils');

exports.parse = function(buffer, offset) {
  var command = {headers: {}, ies: []};
  var pos = exports.parseHead(buffer, offset, command);
  if (pos < buffer.length) {
    exports.parseIe(buffer, pos, command);
  }
  return command; 
};

exports.parseIe = function(buffer, offset, command) {
  var pos = offset;
  do {
    var ie = ies.parse(buffer, offset)
    command.ies.push(ie); 
    pos = pos + ie.headers.length + 4;
  } while(pos < buffer.byteLength);
  return pos;
};

exports.parseHead = function(buffer, offset, command) {
  var pos = offset;
  command.headers['usProtocoltype'] = buffer.readInt16BE(pos);
  pos += 2;
  command.headers['usProtocolVer'] = buffer.readInt16BE(pos);
  pos += 2;
  command.headers['ulSerial'] = buffer.readInt32BE(pos);
  pos += 4;
  command.headers['usFrameNum'] = buffer.readInt16BE(pos);
  pos += 2;
  command.headers['usCurrentFrame'] = buffer.readInt16BE(pos);
  pos += 2;
  command.headers['ulCommandCode'] = buffer.readInt32BE(pos);
  pos += 4;
  command.headers['ulResult'] = buffer.readInt32BE(pos);
  pos += 4;
  command.headers['usHostMid'] = buffer.readInt16BE(pos);
  pos += 2;
  command.headers['usNmsMid'] = buffer.readInt16BE(pos);
  pos += 2;
  command.headers['ulNmsTermId'] = buffer.readInt32BE(pos);
  pos += 4;
  pos += 2; // reserved
  command.headers['aucMacs'] = ineternal.cppString2JsString(buffer, pos);
  pos += 24; // device mac，长度为24个字符，但有效仅为17个
  command.headers['usIEsLength'] = buffer.readInt16BE(pos);
  pos += 2; 
  return pos;
}

