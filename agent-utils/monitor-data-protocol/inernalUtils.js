"use strict";

exports.cppString2JsString = function(buffer, offset) {
  var end;
  for(var i = offset; i < buffer.length; i++) {
    if (0x00 == buffer[i]) {
      end = i;
      break;
    }
  }
  return buffer.toString('gbk', offset, end);
}
