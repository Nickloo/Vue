let mysql = require('mysql');
let async = require('async');
// let step = require('step');
let pool = mysql.createPool({
	host:'localhost',
	port:'3306',
	database:'blog',
	user:'root',
	password:'123456'
});
// let sel_data;
//数据插入
function Insert(table,data){
	pool.getConnection(function(err,connection){
		if(err) console.log('数据库链接失败');
		else{
			connection.query('insert into '+table+' set ?',data,function(err,result){
				if(err){
					console.log('插入数据失败');
					// console.log()
					console.log(err);
				} 
				else{
					// connection.query('select * from ??',[user],function(err,result){
					// 	if(err) 
					console.log('插入数据成功');
					// 	else{
					// 		console.log(result);
							pool.end();
					// 	}
					// })
				}
			})
		}
	})
}
//数据查询
function Select(data,table,where,sel_data,callback){
	// let sel_data;
	// if(data === '') data='*';
	pool.getConnection(function(err,connection){
				if(err) console.log('数据库链接失败');
				else{
					connection.query('select '+data+' from '+table+' where ?',where,function(err,result){
						if(err) console.log('查询数据失败');
						else{
							// sel_data = result;
							
							console.log(result);
							
							pool.end();
							// return result;
							
						}
					})
				}
	})
	// callback('result');
	// callback(sel_data)
	// return sel_data
}

function Register(username,password){
	pool.getConnection(function(err,connection){
				if(err) console.log('数据库链接失败');
				else{
					connection.query('select '+'username'+' from '+'user'+' where ?',{username:username},function(err,result){
						if(err) console.log('查询数据失败');
						else{
							if(result.length!=0){
								console.log('用户已存在');
								pool.end();
							}
							else{
								Insert('user',{username:username,password:password});
								console.log('注册成功')
							}
							setTimeout(function(){
								console.log(typeof(result));
								console.log(result);
							},100)							
						}
					})
				}
	})

	// async.series([
	// 	function(callback) {  
 //            Select('*','user',{username:'小明'},function(data){  
 //                    callback(null,1);  
 //            });  
 //        },
 //        function(callback) {  
 //            console.log('1222222222222') 
 //        },
	// ],function(error,result){
	// 		if(error) {  
 //                console.log("error: ",error,"msg: ",result);  
 //            }  
 //            else {  
 //                console.log("方法执行完毕"+result);  
 //            }
	// })
}
function add(result){
	result=1+1;
	return result
}
function Login(username,password){

}
// console.log(add())
// Select('*','user',{username:'小明'})
// Insert('user',{username:'test',firstname:'李'});
// Register('小xiao','123456')
// exports.database = database
exports.function = {Insert,Register,Select,Login}