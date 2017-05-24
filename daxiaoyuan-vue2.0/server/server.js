// 引入编写好的api
const api = require('./routes/api');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser');
// 引入Express
const express = require('express');
//引入socket
const socket = require('socket.io');
const setTime = require('./utils/setTime');
const http = require('http');
const middlewares = require('./utils/middlewares');
const socketio = require('./utils/io.js');
let app = express();
let server = http.createServer(app);
let io = socket.listen(server);//引入socket.io模块并绑定到服务器
let users = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(middlewares.extendAPIOutput);
app.use(api);
// app.use(middlewares.extendAPIOutput);
app.use(middlewares.apiErrorHandle);
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../dist')));
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    res.send(html);
});
let PORT = process.env.PORT || 8088;
setTime.scheduleRecurrenceRule();
server.listen(PORT);
console.log('success listen…………',PORT);
socketio(io);
