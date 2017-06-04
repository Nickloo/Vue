//引入定时模块
const schedule = require("node-schedule");
//引入数据库模卡
const dao = require('./db.js');
module.exports.getNowFormatDate=function() {
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
module.exports.scheduleRecurrenceRule=function(){
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = 2;
    // rule.month = 1;
    // rule.dayOfMonth = 1;
    // rule.hour = 1;
    // rule.minute = 20;
    let times = [];
    for(let i=1;i<=60;i++){
        times.push(i);
    }
    // rule = times;
    schedule.scheduleJob(rule, function(){
       console.log('scheduleRecurrenceRule:' + new Date());
    //    let sql = "select ans_con,answers.fav_num,answers.date,answers.ans_id,title,questions.que_id,users.username,users.user_logo"+
    //         " from answers,questions,users where answers.que_id = questions.que_id and answers.user_id = users.userId and answers.is_best=1"+
    //         " order by fav_num desc limit 0,10";
    //    dao.selectCustom(sql,[],ret=>{
    //        ret.forEach(function(value,index){
    //            dao.Insert('classics',value,rets=>{
    //                console.log(index);
    //            });
    //        });
    //    });
    dao.selectCustom('select date,ans_id,date_best from answers where "'+new Date().getTime()+'"-date_best<=604800000 and "'+new Date().getTime()+'"-date_best>=86400000 order by fav_num desc limit 0,10',[],ret => {
        if(ret.length===0){
            console.log('保存上周经典失败');
        }else{
            console.log(new Date().getTime-ret[0].date_best,":*************");
            let date = new Date().getTime();
            ret.forEach(function(value,index){
                dao.Insert('classics_list',{ans_id:value.ans_id,date:date},rets=>{
                    console.log('保存上周经典成功');
                })
            })
        }
        console.log("date is ........",ret);
       });
    });
}
