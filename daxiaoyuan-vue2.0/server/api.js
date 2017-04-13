"use strict";
const dao = require('./db');
const express = require('express');
// const response = require('response')
const async = require('async')
const router = express.Router();

const cookieParser = require('cookie-parser');
const session = require('cookie-session');
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
//用户注册
router.post('/api/register',(req,res) => {
    console.log('/api/register');
    let username = req.body.user_name;
    let password = req.body.password
    let data = { 
        username : username,
        password : password
    }
    console.log(username+"      "+password)
    // select.select
    dao.select('users',{username:username},(results) => {
        if(results[0] != undefined){
            console.log("已有此用户名")
            res.json({status:'NO'});
            res.end();
        }else{
            dao.Insert('users',data,() => {
                dao.select('users',{username:username},(results) => {
                    res.apiSuccess('OK','注册成功',results)
                })
                
            })
        }
    })
    console.log(data)
})
//获取用户信息
router.get('/api/getUser',(req,res) => {
    console.log('/api/getUser');
    let userId = req.query.userId;
    console.log('userId:'+userId)
    dao.select('users',{userId:userId},(results) => {
        res.json({status:'OK',msg:'用户信息获取成功',data:results})
    })
});
router.get('/api/getUser/darenMsg',(req,res) => {
    let daren_id = req.query.daren_id;
    console.log(daren_id)
    dao.select('users',{userId:daren_id},(results) => {
        let darenData = {

        }
        res.json({status:'OK',msg:'用户信息获取成功',data:darenData})
        console.log(results)
    })
});
router.route('/api/login').get((req,res) => {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    } 
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
}).post((req,res) => {
    let username = req.body.user_name;
    let password = req.body.password;
    console.log(username)
    dao.select('users',{username:username},(results) => {
        console.log(results[0])
        if(results.length === 0){
            res.json({status:'NO',msg:'用户名不存在'})
        }else{
            if(results[0].password === password){
                res.apiSuccess('OK','登陆成功',results)
                // res.json({status:'OK',msg:'登陆成功',data:results})
            }else{
                res.json({status:'NO',msg:'密码错误'})
            }
        }
        
    })
});
//关注答人
router.post('/api/follows',(req,res) => {
    let userId = req.body.userId;//用户id
    let fav_id = req.body.fav_id;//关注的用户的id
    let fans_name = req.body.fans_name;
    let username = req.body.fav_name;
    let listData = {
        fans_id:userId,
        user_id:fav_id,
        fans_name:fans_name,
        username:username,
    }
    console.log(userId+'      '+fav_id)
    // res.apiSuccess('OK','关注成功')
    let sql1 = 'update users set fav_num = fav_num+1 where userId = "'+userId+'";'
    let sql2 = 'update users set fans_num = fans_num+1 where userId = "'+fav_id+'";'
    dao.Insert('fanslist',listData,(result) => {
        dao.upDateFans(sql1,(results) => {
            dao.upDateFans(sql2,(result) => {
                res.apiSuccess('OK','关注成功',result)
            })
        })
    })
})
//取消关注
router.post('/api/delFav',(req,res) => {
    console.log('/api/delFav')
    let userId = req.body.userId;//用户id
    let fav_id = req.body.fav_id;//关注的用户的id
    console.log(userId+'      '+fav_id)
    let sql1 = 'update users set fav_num = fav_num-1 where userId = "'+userId+'";'
    let sql2 = 'update users set fans_num = fans_num-1 where userId = "'+fav_id+'";'
    dao.delFans(fav_id,userId,(result) => {
        dao.upDateFans(sql1,(results) => {
            dao.upDateFans(sql2,(result) => {
                // dao.delFans(fav_id,userId,(ret) => {
                    res.apiSuccess('OK','取消关注成功',result)
                // })
            })
        })
    })
})
//identy = 1时为答人身份
router.get('/api/getDarenMsg',(req,res) => {
    console.log('******************/api/getDarenMsg')
    // let identy = req.query.identy;
    dao.select('users',{identy:1},(results) => {
        if(results[0] === undefined){
            res.apiSuccess('ON','获取信息失败',results)
        }else{
            res.apiSuccess('OK','登陆成功',results)
        }
    })
})
//更新用户信息
router.post('/api/setUser',(req,res) => {
    console.log('******************/api/setUser')
    let userId = req.body.userId;
    let username = req.body.username;
    let update = {};
    for(var key in req.body){
        if(req.body[key] != ''){
            update[key] = req.body[key];
        }
        console.log(update)
    }
    console.log('userid is '+userId)
    dao.upDate("users",[update,{userId:userId}],function(results){
        // console.log(results)
        // res.apiSuccess('OK','信息保存成功')
        dao.select('users',{userId:userId},(results) => {
            res.json({status:'OK',msg:'信息保存成功',data:results})
            console.log(results)
        })
    })
})
//创建问题
router.post('/api/createQue',(req,res) => {
    console.log('######接口/api/createQue')
    let que_data = {
        username:req.body.username,
        title:req.body.title,
        content:req.body.content,
        que_date:req.body.que_date,
        user_id:req.body.user_id,
        type:req.body.type,
        is_private:req.body.is_private,
    }
    if(que_data.title === ''||que_data.title=== ''||que_data.content=== ''){
        for(let key in que_data){
            if(que_data[key] === '' && key != 'type'){
                res.json({status:'ON',msg:key+'为空'});
                console.log(key+'为空')
                return false;
            }
        }
    }else{
        console.log(que_data)
        dao.Insert('questions',que_data,(results) => {
            res.json({status:'OK',msg:'问题保存成功'})
        })
    }
    
})
//文字回答
router.post('/api/answer/text',(req,res) => {
    let ansData = {
        que_id:req.body.que_id,
        text_con:req.body.text_con,
        is_voice:0
    }
    dao.Insert('answers',ansData,(results) => {
        res.apiSuccess('OK','回答提交成功',results)
    })
})
//语音回答
router.post('/api/answer/voice',(req,res) => {
    let ansData = {
        que_id:req.body.que_id,
        text_con:req.body.text_con,
        is_voice:1,
        voice_src:''
    }
    dao.Insert('answers',ansData,(results) => {
        res.apiSuccess('OK','回答提交成功',results)
    })
})
//获取所有问题
router.get('/api/getQuestion',(req,res) => {
    console.log('/api/getQuestion')
    dao.select('questions',{is_private:0},(result) => {
        // date = result.que_date
        // result.que_date = moment().format(date);
        res.apiSuccess('OK','问题获取成功',result)
        console.log(result)
    })
})
//获取单个问题
router.get('/api/getQuestion/queCon',(req,res) => {
    let que_id = req.query.que_id;
    let user_id = req.query.user_id;
    console.log('que_id    '+que_id)
    console.log('user_id     '+user_id)
    console.log('/api/getQuestion/queCon')
    if(que_id){
        console.log(que_id)
        // console.log('/api/getQuestion/queCon')
        dao.select('questions',{que_id:que_id},(result) => {
            res.apiSuccess('OK','问题获取成功',result[0])
            console.log(result[0])
        })
    }else if(user_id){
        console.log(user_id)
        // console.log('/api/getQuestion/queCon')
        dao.select('questions',{user_id:user_id},(result) => {
            res.apiSuccess('OK','问题获取成功',result)
            console.log(result)
        })
    }
    
})
//获取问题所有答案
router.get('/api/getQueAns',(req,res) => {
    console.log('/api/getQueAns')
    let que_id = req.query.que_id;
    if(que_id)
    dao.selectAns({que_id:que_id},(ret) => {
        console.log(ret)
        res.apiSuccess('OK','信息获取成功',ret)
    })
    else{
        res.apiSuccess('ON','que_id空',[])
    }
})
//获取专栏信息
router.get('/api/getColumn',(req,res) => {
    dao.selectAll('col_list',(results) => {
        res.apiSuccess('OK','专栏信息获取成功',results)
    })
})
//获取回答列表
// router.get('/api/getAnswers',(req,res) => {
//     dao.selectAll('col_list',(results) => {
//         res.apiSuccess('OK','专栏信息获取成功',results)
//     })
// })
//获取问题回答
router.get('/api/getAnswers',(req,res) => {
    dao.selectAll('col_list',(results) => {
        res.apiSuccess('OK','专栏信息获取成功',results)
    })
})

//提交回答
router.post('/api/answer',(req,res) => {
    console.log('/api/answer');
    let data = {
        text_con:req.body.text_con,
        que_id:req.body.que_id,
        user_id:req.body.user_id,
        is_voice:req.body.is_voice,
        voice_src:req.body.voice_src,
        que_title:req.body.que_title,
        que_con:req.body.que_con
    };
    dao.Insert('answers',data,(result) => {
        console.log(result);
        res.apiSuccess('OK','回答提交成功',{})
    });
    console.log(data);
})
// 获取答人准确信息
router.get('/api/getDarenMsg/person',(req,res) => {
    console.log('/api/getDarenMsg/person');
    let daren_id = req.query.daren_id;
    let user_id = req.query.user_id;
    console.log('daren_id   '+daren_id);
    console.log('user_id   '+user_id);
    async.series({
        daren_msg: function(callback){
            dao.select('users',{userId:daren_id},(ret) => {
                try {
                    callback(null, {
                        username:ret[0].username,
                        user_logo:ret[0].user_logo,
                        introduction:ret[0].introduction,
                    });
                } catch (error) {
                    console.log('错误信息为：'+error)
                }
            })
        },
        answer: function(callback){
            dao.select('answers',{user_id:daren_id},(ret) => {
                let i = 0;
                let len = ret.length
                if(len === 0){
                    console.log('************空空')
                    callback(null, ret);
                    return false
                }
                callback(null, ret);                      
            })
        },
        question: function(callback){
            dao.select('questions',{best_userId:daren_id},(ret) => {
                callback(null,ret)
            })
        },
        is_fav: function(callback){
            let isFav;
            let sql = 'select * from fanslist where fans_id = "'+user_id+'" and user_id = "'+daren_id+'";'
            dao.selectCustom(sql,(result) => {
                if(result.length === 0){
                    callback(null, 0);
                }else{
                    callback(null, 1);
                }
            })
        },
    },function(err, results) {
        console.log(results);
        res.apiSuccess('OK','数据获取成功',results)
    });
    
})
// 设置最佳答案
router.post('/api/setbest',(req,res) => {
    console.log('/api/setbest');
    dao.upDate('answers',[{is_best:1},{ans_id:req.body.ans_id}],(ret) => {
        res.apiSuccess('OK','设置成功',{})
    })
})
// 取消最佳答案
router.post('/api/delbest',(req,res) => {
    console.log('/api/delbest');
    dao.upDate('answers',[{is_best:0},{ans_id:req.body.ans_id}],(ret) => {
        res.apiSuccess('OK','设置成功',{})
    })
})
//获取粉丝列表
router.get('/api/getfans',(req,res) => {
    console.log('/api/getfans');
    dao.selectFans({user_id:req.query.user_id},(ret) => {
        res.apiSuccess('OK','获取粉丝信息成功',ret);
    })
})
// api模板
router.post('',(req,res) => {
    console.log('');
    console.log('');
})
module.exports = router;