var express = require('express');
var basicAuth = require('basic-auth');
var mysql = require('mysql');
var app = express();
var pool = mysql.createPool({
    host:'localhost',
    port:'3306',
    database:'blog',
    user:'root',
    password:'123456'
});
// app.use(app.basicAuth(function(user,pass,callback){
//     pool.getConnection(function(err,connection){
//         if(err){
//             connection.release();
//             callback(null,false);
//         }else{
//             connection.query('select count(1) count from user where username = ? and password = ?',[user,pass],
//             function(err,result){
//                 if(err){
//                     connection.release();
//                     callback(null,false);
//                 }else{
//                     connection.release();
//                     if(result[0].count>0){
//                         callback(null,true)
//                     }else{
//                         callback(null,false)
//                     }
//                 }
//             })
//         }
//     })
// }));
let setConsole = function(){
    return function(req,res,next){
        res.output = '中间件启动'
    }
}
// app.use(function(){
//     return function(req,res,next){
//         console.log('中间件');
//         res.test = 'zhongjian';
//         next()
//     }
    
// })
app.use(setConsole)
app.get('/',function(req,res){
    res.send('nihao')
    console.log(res.output)
});
app.listen(1337,"127.0.0.1")
console.log('服务启动');