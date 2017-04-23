const socket = require('socket.io')
let users = []
// const http = require('http')
// let io = socket.listen(server);//引入socket.io模块并绑定到服务器
function io(io){
    io.on('connection',function(socket){
        //接受并处理客户端发送的foo事件
        socket.on('login',function(userid){
            console.log('login userid is '+userid);
            socket.userid = userid;
            if(users.indexOf(userid)>-1){
                console.log('该用户已登录');
                socket.emit('userExisted');
            }
            users.push(userid);
        });
        socket.on('disconnect',function(nickname){
            console.log('logout userid is '+socket.userid);
        });
    })
}
module.exports = io;