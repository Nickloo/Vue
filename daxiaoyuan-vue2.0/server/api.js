"use strict";
const dao = require('./db');
const express = require('express');
const async = require('async');
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const jwt = require('jsonwebtoken');
const tokenUtil = require('./utils/tokenUtil.js');
let superSecret = "nickloong$#.."
let tokenM = new tokenUtil();
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
                    let token = tokenM.createToken({username:username,userId:results[0].userId},superSecret);
                    res.apiSuccess('OK','注册成功',{userId:results[0].userId,token})
                    console.log({userId:results[0].userId,token})
                })
            })
        }
    })
    // console.log(data)
})
//用户登陆
router.route('/api/login').post((req,res) => {
    console.log('/api/login')
    // token.createToken
    let username = req.body.user_name;
    let password = req.body.password;
    let sql = "select password,userId from users where username = '"+username+"';"
    console.log(username+'      :'+password)
    dao.selectCustom(sql,(results) => {
        console.log(results[0])
        if(results.length === 0){
            res.json({status:'NO',msg:'用户名不存在'})
        }else{
            if(results[0].password === password){
                let token = tokenM.createToken({username:username,userId:results[0].userId},superSecret);
                res.apiSuccess('OK','登陆成功',{userId:results[0].userId,token:token})
            }else{
                res.json({status:'NO',msg:'密码错误'})
            }
        }
        
    })
});
//获取用户信息
router.get('/api/getUser',(req,res) => {
    console.log('/api/getUser');
    let userId = req.query.userId;
    let token = req.query.token;
    jwt.verify(token, superSecret, function(err, decoded) {
      if (err) {
        console.log('token error');
        res.apiSuccess('NO','token错误',{})
      } else {
        // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
        req.api_user = decoded;
        console.dir(decoded);
        let sql = "select * from users where userId = "+userId;
        dao.selectCustom(sql,(results) => {
            res.apiSuccess('OK','用户信息获取成功',results[0])
        });
      }
    });
    console.log('userId:'+userId);
    
});
//获取答人信息set api header
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
    console.log('userid is '+userId)
    for(let key in req.body){
        if(req.body[key] != ''){
            update[key] = req.body[key];
        }
        console.log(update)
    }
    setTimeout(() => {
        if(req.body.username){
            dao.select('users',{username:req.body.username},(ret) => {
                if(ret.length !== 0){
                    res.apiSuccess('ON','该用户名已存在');
                }else{
                    dao.upDate("users",[update,{userId:userId}],function(results){
                        // dao.select('users',{userId:userId},(results) => {
                            res.json({status:'OK',msg:'信息保存成功',data:results});
                        // })
                    })
                }
            })
        }else{
            dao.upDate("users",[update,{userId:userId}],function(results){
                // dao.select('users',{userId:userId},(results) => {
                    res.json({status:'OK',msg:'信息保存成功',data:results});
                // })
            })
        }
    },100);
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
        dao.select('users',{userId:req.body.user_id},(ret) => {
            que_data.username = ret[0].username;
            dao.Insert('questions',que_data,(results) => {
                res.json({status:'OK',msg:'问题保存成功',data:results})
            })
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
})
//获取单个问题
router.get('/api/getQuestion/queCon',(req,res) => {
    console.log('/api/getQuestion/queCon________')
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
        let sql = "select * from questions where user_id = "+user_id+" order by que_id desc"
        dao.selectCustom(sql,(result) => {
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
    
    let data = {
        ans_con:req.body.ans_con,
        que_id:req.body.que_id,
        user_id:req.body.user_id,
        is_voice:req.body.is_voice,
        voice_src:req.body.voice_src,
        que_title:req.body.que_title,
        que_con:req.body.que_con
    };
    console.log('/api/answer'+data.user_id);
    dao.Insert('answers',data,(result) => {
        dao.upDateFans('update users set answer_num = answer_num+1 where userId = '+data.user_id+'',(ret) => {
            console.log(result);
            res.apiSuccess('OK','回答提交成功',{})
        })
    });
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
    console.log('/api/getClassics******************');
    let page = req.query.page;
    let limit = page*5-5;
    dao.selectCustom('select * from classics limit '+limit+',5',(ret) => {
        let j = 0;
        if(ret.length !== 0){
            for(let i=0;i<ret.length;i++){
                dao.select('users',{userId:ret[i].answer_user_id},(result) => {
                    ret[i].ans_username = result[0].username;
                    ret[i].ans_user_logo = result[0].user_logo;
                    j++;
                    console.log('I:'+i);
                    console.log('J:'+j);
                    if(j===ret.length){
                        res.apiSuccess('OK','获取信息成功',ret);
                        console.log(i+'结束###########');
                    }
                })
            }
        }else{
            res.apiSuccess('OK','获取信息成功',[]);
            console.log(null+'结束###########');
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
    console.log('/api/getClassics/que******************')
    dao.select('classics',{que_id:que_id},(ret) => {
        if(ret.length === 0) {
            console.log('没有最佳答案');
            res.apiSuccess('NO','没有最佳答案',{})
        }
        else{
            try {
                dao.select('users',{userId:ret[0].answer_user_id},(result) => {
                    ret[0].ans_username = result[0].username;
                    ret[0].ans_user_logo = result[0].user_logo;
                    res.apiSuccess('OK','获取信息成功',ret[0])
                })
            } catch (error) {
                console.error(error)
            }
        }
    })
})
//获取上周经典
router.get('api/getLatest',(req,res) => {

})
//申请答人
router.post('/api/applyDr',(req,res) => {
    let introduction = req.body.introduction;
    let identy_type = req.body.identy_type;
    let userId = req.body.userId;
    let picture = req.body.picture;
    let data = {
        introduction:introduction,
        identy_type:identy_type,
        userId:userId,
        picture:picture

    };
    dao.Insert('applylist',data,(ret) => {
        res.apiSuccess('OK')
    });
})
// api模板
router.post('',(req,res) => {
    console.log('');
    console.log('');
})
//获取全部用户信息；
router.get('/api/getAllUsers',(req,res) => {
    let token = req.query.token;
    console.log('/api/getAllUsers:'+token)
    jwt.verify(token, superSecret, function(err, decoded) {
      if (err) {
        console.log('token error');
        res.apiSuccess('NO','token错误',{})
      } else {
        let sql = "select username,userId,user_logo,identy,school,profession,interest,good_skill,email,introduction from users";
        dao.selectAll('users',(ret) => {
            res.apiSuccess('OK','success',ret);
        })
      }
    });
})
//按要求查询用户信息；
router.get('/api/getTypeuser',(req,res) => {
    let token = req.query.token;
    let data = req.query.data;
    console.log('/api/getTypeuser:',data)
    dao.select('users',data,(ret) => {
        res.apiSuccess('OK','success',ret)
    })
})
//删除用户
router.delete('/api/deleteUser',(req,res) => {
    let token = req.body.token;
    let userId = req.body.userId;
    let data = {
        userId:userId
    }
    console.log('/api/deleteUser:',data)
    dao.Delete('users',data,(ret) => {
        res.apiSuccess('OK','success')
    })
})
//获取申请列表
router.get('/api/getApply',(req,res) => {
    let token = req.query.token;
    console.log("/api/getApply:token  "+token);
    dao.selectCustom('select * from applylist where status = 0',(rets) => {
        let j = 0;
        if(rets.length === 0){
            res.apiSuccess('OK','获取申请信息成功',[]);
        }else{
            for(let i=0;i<rets.length;++i){
                dao.select('users',{userId:rets[i].userId},(ret) => {
                    rets[i].username = ret[0].username;
                    j++;
                    if(j===rets.length){
                        res.apiSuccess('OK','获取申请信息成功',rets);
                        console.log(rets)
                    }
                })
            }
        }
    });
})
//同意或拒绝申请
//type=1是同意 type=0是拒绝
//index
router.post('/api/decideApply',(req,res) => {
    let userId = req.body.userId;
    let identy_type = req.body.identy_type;
    let introduction = req.body.introduction;
    let index = req.body.index;
    let type = req.body.type;
    console.log('/api/decideApply:'+type);
    if(type === '1'){
        dao.upDate('users',[{identy:1,identy_type:identy_type,introduction:introduction},{userId:userId}],(ret) => {
            dao.upDate('applylist',[{status:1},{index:index}],(rets) => {
                res.apiSuccess('OK','同意成功',rets)
                console.log('同意成功')
            })
        })
    }else{
        dao.upDate('applylist',[{status:2},{index:index}],(rets) => {
            res.apiSuccess('OK','拒绝成功',rets)
            console.log('拒绝成功')
        })
    }
})
module.exports = router;