var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


//var morgan = require('morgan');
var app = express();
var server = require('http').createServer(app);

app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/json', function (req, res) {
  console.log(req.body);
  res.send(req.body);

});

var PORT = process.env.PORT || 8002;
server.listen(PORT);