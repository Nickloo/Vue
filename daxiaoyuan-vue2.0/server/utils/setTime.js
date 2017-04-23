//引入定时模块
const schedule = require("node-schedule");
setInterval(function(){
    // document.write('<p>Hello there.</p>');
}, 10000);
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
module.exports.setIt = function(){
    var rule = new schedule.RecurrenceRule();
    var times = [];
    for(var i=1; i<60; i++){
    　　times.push(i);
    }
    rule.second = times;
    var c=0;
    var j = schedule.scheduleJob(rule, function(){
        c++;
        console.log(c);
    });
}
