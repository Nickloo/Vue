// "use strict";
const dao = require('./db');
const express = require('express');
// const response = require('response')
const router = express.Router();

var cookieParser = require('cookie-parser');
var session = require('cookie-session');

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
router.use(cookieParser())
router.use(session({
    secret: 'blog'
}))
router.use(function timeLog(req,res,next) {
    var _user = req.session.user;
    if(_user) {
        //router.locals.user = user;
    }
    next();
})
router.post('/api/register',(req,res) => {
    let username = req.body.user_name;
    let password = req.body.password
    let data = {
        username : username,
        password : password
    }
    console.log(username+"      "+password)
    // select.select
    dao.select('SELECT * FROM users WHERE username = "'+ username + '";')
        .then(function(data) {
            if(data.status == 'OK') {
                console.log("已有此用户名")
                res.json({status:'NO'});
                res.end();
            }else {
                dao.select('INSERT INTO users(username,password) VALUES ("'+username+'", "'+password+'");')
                .then(function(data) {  
                    res.json({status:'OK'});
                    res.end();
                }).catch(function(err){})
            }           
        }).catch(function(err){

        })
    // db.Register(username,password);
    // models.selectFun(username,function(results){
    //     if(results[0] === undefined){
    //         models.Insert('users',data)
    //         res.apiSuccess({msg:'ok'})
    //     }else{
    //         res.apiSuccess({msg:'no'})
    //     }
    // })
    console.log(data)
})
router.get('/api/getQuestion',(req,res) => {

});
router.post('/api/login',(req,res) => {
    let username = req.body.user_name;
    let password = req.body.password;
    console.log(username)
    // res.apiError()
    // select('SELECT * FROM users WHERE username = "'+ username + '";')
    dao.selectFun(username,(results) => {
        if(results.length === 0){
            res.json({status:'NO',msg:'用户名不存在'})
        }else{
            if(results[0].password === password){
                res.json({status:'OK',msg:'登陆成功'})
            }else{
                res.json({status:'NO',msg:'密码错误'})
            }
        }
    })
});

module.exports = router;