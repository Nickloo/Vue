const jwt = require('jsonwebtoken');
let tokenUtil = function(){

}
tokenUtil.prototype.createToken = function(user,secret){
    let token = jwt.sign(user,  secret, {
        // expiresIn : 60*60*24 // 设置过期时间
        expiresIn : 60*60*24 // 设置过期时间
    });
    return token;
}
module.exports = tokenUtil