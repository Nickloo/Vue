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
function  selectFun(username,callback){
     //client为一个mysql连接对象
	 pool.getConnection(function(err,connection){
		connection.query('select password from user where username="'+username+'"',function(err,results,fields){
			if(err) throw err;
	
			callback(results);
		});
	 })
    //  client.query('select password from user where username="'+username+'"',function(err,results,fields){
    //      if(err) throw err;
 
    //      callback(results);
    //  });
 }
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
	console.log("add()")
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
module.exports = {Insert,Register,Select,Login,selectFun}