"use strict";
const models = require('./db');
const express = require('express');
// const response = require('response')
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

router.post('/api/register',(req,res) => {
    let adata = {
        user_name : req.body.user_name,
        password : req.body.password
    }
    models.Register(req.body.user_name,req.body.password)
    // if(1===1){
        res.apiSuccess('123')
    // }
    // res.apiError
    
    console.log(adata)
})
router.get('/api/getQuestion',(req,res) => {

});
router.post('/api/login',(req,res) => {
    let username = req.body.user_name;
    let password = req.body.password;
    console.log(username)
    // res.apiError()
    models.selectFun(username,function(results){
        if(results[0] === undefined){
            // res.send('')
            res.apiSuccess({login:'on'})
        }else{
            if(results[0].password === password){
                res.apiSuccess({login:'ok'})
            }else{
                res.apiSuccess({login:'on'})
            }
        }
    })
});

module.exports = router;