"use strict";
var ineternal = require('./inernalUtils');

exports.parse = function(buffer, offset) {
  var ie = {headers: {}};
  var pos = exports.parseHead(buffer, offset, ie);
  exports.parseContent(buffer, pos, ie);
  return ie; 
};

exports.parseContent = function(buffer, offset, ie) {
  var pos = offset;
  ie['ulIsDHCP'] = buffer.readInt32BE(pos);
  pos += 4;
  ie['ulLcnsExist'] = buffer.readInt32BE(pos);
  pos += 4;
  ie['aucName'] = ineternal.cppString2JsString(buffer, pos);
  pos += 48;
  ie['aucIPAddr'] = ineternal.cppString2JsString(buffer, pos);
  pos += 20;
  ie['aucMask'] = ineternal.cppString2JsString(buffer, pos);
  pos += 20;
  ie['aucMac'] = ineternal.cppString2JsString(buffer, pos);
  pos += 20;
  ie['aucSoftVer'] = ineternal.cppString2JsString(buffer, pos);
  pos += 96;
  return pos;
}

exports.parseHead = function(buffer, offset, ie) {
  var pos = offset;
  ie.headers['id'] = buffer.readInt16BE(pos);
  pos += 2;
  ie.headers['length'] = buffer.readInt16BE(pos);
  pos += 2;
  return pos;
}
