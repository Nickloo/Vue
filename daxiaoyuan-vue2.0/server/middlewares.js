// /**
//  * 简单API服务器
//  *
//  * @author Zongmin Lei <leizongmin@gmail.com>
//  */

var path = require('path');
var parseUrl = require('url').parse;
// var redis = require('redis');
var bodyParser = require('body-parser');
var connect = require('connect');
var multipart = require('connect-multiparty');
var js2xmlparser = require('js2xmlparser');
// var utils = require('./utils');
// var database = require('./database');


// 检查用户是否已登录
exports.ensureLogin = function (req, res, next) {
  // 这里直接设置用户ID=glen
  req.loginUserId = 'glen';
  next();
};


// 解析请求Body部分
var postBody = connect();
postBody.use(bodyParser.json());
postBody.use(bodyParser.urlencoded({extended: true}));
postBody.use(multipart());
exports.postBody = postBody;


// // 扩展 res.apiSuccess() 和 res.apiError()
exports.extendAPIOutput = function (req, res, next) {

  // 输出数据
  function output (data) {

    // 取得请求的数据格式
    var type = path.extname(parseUrl(req.url).pathname);
    if (!type) type = '.' + req.accepts(['json', 'xml']);
    switch (type) {
      case '.xml':
        return res.xml(data);
      default:
        return res.json(data);
    }
  }

  // 响应API成功结果
  res.apiSuccess = function (data) {
    output({
      status: 'OK',
      result: data
    });
  };

  // 响应API出错结果，err是一个Error对象，
  // 包含两个属性：error_code和error_message
  res.apiError = function (err) {
    output({
      status: 'Error',
      error_code: err.error_code || 'UNKNOWN',
      error_message: err.error_message || err.toString()
    });
  };
  res.apiErrorT = function (message) {
    output({
      status: 'Error',
      error_message:message.toString()
    });
    // console.log('cuowu')
  };
  // 输出XML格式数据
//   res.xml = function (data) {
//     res.setHeader('content-type', 'text/xml');
//     res.end(js2xmlparser('data', data));
//   };

  next();

};


// 统一处理API出错信息
exports.apiErrorHandle = function (err, req, res, next) {
  console.error((err && err.stack) || err.toString());

  // 如果有res.apiError()则使用其来输出出错信息
  if (typeof res.apiError === 'function') {
    return res.apiError(err);
  }

  next();
};