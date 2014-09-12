'use strict';

// 类型ID
exports.MessageTypeIds = {
  MSG_TYPE_LOGIN: 1001, // 登录信息
  MSG_TYPE_HEART: 1002, // 心跳信息
  REPLY: 1003, // 应答信息
  REPORT: 1004, // 终端信息上报
  CONFIG: 1005, // 动态监控平台下发数据配置
  CONNECTION_REQUEST: 1006, // 请求数据服务器发送连接信息
  CONNECTION_RESPONSE: 1007 // 数据服务器响应连接信息
}

// ID
exports.MessageIds = {
  // ************************* 通用响应命令类型 ************************
  MSG_REPLY_SUCCEED: 1101, // 成功应答
  MSG_REPLY_FAILED: 1102, // 失败应答
  // ************************* 登录命令类型 ****************************
  USER_TYPE_LOCAL_MONITOR: 1401, // 客户端类型，监测界面
  // ************************* 通知信息命令(上报信息命令)类型 *************
  COMM_TYPE_ELEMENT_INFO: 1301, // 外部网元连接信息
  COMM_TYPE_NM_CONNECTION: 1302, // 航标连接状态
  COMM_TYPE_WL_CONNECTION: 1303, // 水位连接状态
  COMM_TYPE_NM_DATA: 1304, // 航标上报数据
  COMM_TYPE_WL_DATA: 1305, // 水位上报数据
  COMM_TYPE_CORS_INFO: 1307, // 差分源数据信息
  COMM_TYPE_SERVER_HANDSHAKE: 1308 // 服务器握手请求
}

exports.createMessage = function(typeId, id, serial, values) {

}

exports.parseFrame = function(){}

exports.parseMessage = function(data) {
}
