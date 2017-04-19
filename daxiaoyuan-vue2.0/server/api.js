"use strict";
const dao = require('./db');
const express = require('express');
const async = require('async');
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
router.use(cookieParser())
router.use(session({
    secret: 'users',
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
                    res.apiSuccess('OK','注册成功',results[0].userId)
                    console.log(results[0].userId)
                })
            })
        }
    })
    // console.log(data)
})
//获取用户信息
router.get('/api/getUser',(req,res) => {
    console.log('/api/getUser');
    let userId = req.query.userId;
    console.log('userId:'+userId);
    let sql = "select * from users where userId = "+userId;
    dao.selectCustom(sql,(results) => {
        res.json({status:'OK',msg:'用户信息获取成功',data:results})
    })
});
//获取答人信息
router.get('/api/getUser/darenMsg',(req,res) => {
    let daren_id = req.query.daren_id;
    console.log(daren_id);
    let sql = "select username,userId,user_logo,fav_num,fans_num,introduction from users where userId = "+daren_id
    dao.select(sql,(results) => {
        let darenData = {

        }
        res.json({status:'OK',msg:'用户信息获取成功',data:darenData})
        // console.log(results)
    })
});
//用户登陆
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
    let sql = "select password,userId from users where username = '"+username+"';"
    console.log(typeof(username))
    dao.selectCustom(sql,(results) => {
        console.log(results[0])
        if(results.length === 0){
            res.json({status:'NO',msg:'用户名不存在'})
        }else{
            if(results[0].password === password){
                res.apiSuccess('OK','登陆成功',results[0].userId)
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
    let identy_type = req.query.type
    dao.select('users',{identy_type:identy_type},(results) => {
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
            // console.log(results)
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
        // console.log(que_data)
        dao.Insert('questions',que_data,(results) => {
            res.json({status:'OK',msg:'问题保存成功',data:results})
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
    let type = req.query.type;
    // let page = 1;//where type = '"+type+"'
    let page = req.query.page;
    let start = page*5-5;
    console.log(start+"#######")
    console.log('/api/getQuestion')
    let sql = "select * from questions where type = '"+type+"' limit "+start+",5";
    dao.selectCustom(sql,(ret) => {
        if(ret){
            res.apiSuccess('OK','问题获取成功',ret);
            console.log(ret.length)
        }else{
            res.apiSuccess('ON')
            // console.log(ret)
        }
    })
    // dao.select('questions',{type:type},(result) => {
    //     // date = result.que_date
    //     // result.que_date = moment().format(date);
    //     res.apiSuccess('OK','问题获取成功',result)
    //     // console.log(result)
    // })
})
//获取单个问题
router.get('/api/getQuestion/queCon',(req,res) => {
    console.log('/api/getQuestion/queCon')
    let que_id = req.query.que_id;
    let user_id = req.query.user_id;
    console.log('que_id    '+que_id)
    console.log('user_id     '+user_id)
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
            // console.log(result)
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
    console.log('/api/getColumn')
    dao.selectAll('col_list',(results) => {
        res.apiSuccess('OK','专栏信息获取成功',results)
    })
})
//获取我的回答
router.get('/api/getMyAns',(req,res) => {
    let page = req.query.page;
    let userId = req.query.userId;
    let start = page*5-5;
    console.log('/api/getMyAns  '+"page  "+page+"  userId   "+userId)
    let sql = "select * from answers where user_id = '"+userId+"' limit "+start+",5";
    if(page&&userId){
        dao.selectCustom(sql,(ret) => {
            res.apiSuccess('OK','success',ret)
        })
    }else{
        console.error('err')
    }
    
})

//提交回答
router.post('/api/answer',(req,res) => {
    console.log('/api/answer');
    let data = {
        ans_con:req.body.ans_con,
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
    // console.log(data);
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
//
router.get('/api/getFollows',(req,res) => {
    let userId = req.query.userId;
    console.log('/api/getFollows'+userId)
    dao.selectFollow(userId,(results) => {
        res.apiSuccess('OK','获取关注信息成功',results)
        console.log(results)
    })
})
// 设置最佳答案
router.post('/api/setbest',(req,res) => {
    let que_id = '';
    let ans_id = req.body.ans_id;
    console.log('/api/setbest');
    dao.select('answers',{ans_id:ans_id},(ret) => {
        if(ret.length !== 0){
            res.apiSuccess('ON','已有最佳答案')
        }else{
            dao.upDate('answers',[{is_best:1},{ans_id:ans_id}],(ret) => {
                // dao.upDate('questions',[{}])
                dao.selectCustom('select * from answers where ans_id = "'+ans_id+'"',(rets) => {
                    que_id = rets[0].que_id;
                    dao.upDate('questions',[{best_id:ans_id},{que_id:que_id}],() => {
                        dao.select('questions',{que_id:que_id},(result) => {
                            let clas_data = {
                                ans_id:ans_id,
                                que_id:que_id,
                                que_title:result[0].title,
                                ans_con:rets[0].text_con,
                                answer_user_id:rets[0].user_id,
                                que_user_id:result[0].user_id,
                                is_voice:rets[0].is_voice,
                                voice_src:rets[0].voice_src,
                                date:new Date().toLocaleDateString()
                            };
                            res.apiSuccess('OK','设置成功',clas_data);
                            dao.Insert('classics',clas_data,(re) => {
                                console.log(clas_data);
                            })
                        })
                    })
                })
            })
        }
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
//获取最新咨询
router.get('/api/getClassics',(req,res) => {
    console.log('/api/getClassics******************')
    dao.selectAll('classics',(ret) => {
        let j = 0;
        for(let i=0;i<ret.length;i++){
            dao.select('users',{userId:ret[i].answer_user_id},(result) => {
                ret[i].ans_username = result[0].username;
                ret[i].ans_user_logo = result[0].user_logo;
                j++
                console.log('I:'+i);
                console.log('J:'+j);
                if(j===ret.length){
                    res.apiSuccess('OK','获取信息成功',ret)
                    console.log(i+'结束###########')
                }
            })
        }
    })
})
//获取个人最佳答案
router.get('/api/getClassics/person',(req,res) => {
    let answer_user_id = req.query.answer_user_id;
    console.log('/api/getClassics/person******************'+answer_user_id)
    dao.select('classics',{answer_user_id:answer_user_id},(ret) => {
        dao.select('users',{userId:answer_user_id},(result) => {
            let j=0;
            for(let i=0;i<ret.length;i++){
                ret[i].ans_username = result[0].username;
                ret[i].ans_user_logo = result[0].user_logo;
                j++;
                if(j===ret.length){
                    res.apiSuccess('OK','success',ret);
                }
            }
        })
    })
})
//获取单个最佳
router.get('/api/getClassics/que',(req,res) => {
    let que_id = req.query.que_id;
    console.log('/api/getClassics/person******************')
    dao.select('classics',{que_id:que_id},(ret) => {
        dao.select('users',{userId:ret[0].answer_user_id},(result) => {
            ret[0].ans_username = result[0].username;
            ret[0].ans_user_logo = result[0].user_logo;
            res.apiSuccess('OK','获取信息成功',ret[0])
        })
    })
})
//获取上周经典
router.get('api/getLatest',(req,res) => {

})
// api模板
router.post('',(req,res) => {
    console.log('');
    console.log('');
})
module.exports = router;