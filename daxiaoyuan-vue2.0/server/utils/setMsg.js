const dao = require('../db.js');
module.exports.setMsg=function(userId,message,is_private,callback){
    dao.Insert('messages',{userId:userId,message:message,is_private},ret=>{
        callback(true);
    })
}
