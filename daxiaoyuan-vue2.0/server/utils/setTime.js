//引入定时模块
const schedule = require("node-schedule");
//引入数据库模卡
const dao = require('../db.js');
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
    rule.dayOfWeek = 1;
    // rule.month = 1;
    // rule.dayOfMonth = 1;
    // rule.hour = 1;
    // rule.minute = 52;
    let times = [];
    for(let i=1;i<=24;i++){
        times.push(i);
    }
    // rule.second = times;
    // rule.hour = 0;
    schedule.scheduleJob(rule, function(){
       console.log('scheduleRecurrenceRule:' + new Date());
       let sql = "select ans_con,answers.fav_num,answers.date,answers.ans_id,title,questions.que_id,users.username,users.user_logo"+
            " from answers,questions,users where answers.que_id = questions.que_id and answers.user_id = users.userId and answers.is_best=1"+
            " order by fav_num desc limit 0,10";
       dao.selectCustom(sql,[],ret=>{
           ret.forEach(function(value,index){
               dao.Insert('classics',value,rets=>{
                   console.log(index);
               })
           })
       })
    });
}