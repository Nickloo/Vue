const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

let options = {
    host: 'localhost',
	port:'3306',
	database:'blog',
    user: 'root',
    password: '123456',
	// queueLimit:10
}
var pool = mysql.createPool(options);
function objectSize(the_object) {
 var object_size = 0;
 for (key in the_object){
  if (the_object.hasOwnProperty(key)) {
   object_size++;
  }
 }
 return object_size;
}
// function select(sql) {
//     var promise = new Promise(function(resolve,reject) {
//         var result = null;
//         // var mysql = require('mysql');
//         var connection = mysql.createConnection(options);
//         connection.connect();
//         // connection.query("USE test");
//         connection.query(sql, function (err, results, fields) { 
//             if (err) { 
//                 console.log("err");
//                 reject(err); 
//             }else {
//                 console.log("yessssssss");
//                 if(results.length > 0) {
//                     resolve({status: 'OK'});
//                 }else {
//                     resolve({status: 'NO'});
//                 }           
//             }
// 			// callback(results) 
//           } 
//         );
//         connection.end(); 
//     })

//     return promise; 
// }
// function select(){
//     var connection = mysql.createConnection(options);
// 	connection.connect();
//     connection.query('select * from ',data,(err,results,fields) => {
//         if(err) console.log(err);
//         else{
//             callback(results)
//         }
//     })
// }
function Insert(table,data,callback){
	pool.getConnection(function(err,connection){
		try {
			connection.query('insert into '+table+' set ?',data,(err,results,fields) => {
				if(err) console.log(err);
				else{
					callback(results)
				}
				
			})
		} catch (error) {
			console.log('出现错误：'+error)
		}
		
		connection.release();
	})
}
//field查询字段 value字段值
function select(table,data,callback){
	pool.getConnection(function(err,connection){
		if(err) throw err;
		else{
			try {
				connection.query('select * from '+table+' where ?;',data,(err,results,fields) => {
					if(err) throw err;
					else{
						callback(results)
					}
				})
			} catch (error) {
				console.log('出现错误：'+error)
			}
			connection.release();
		}
	})
}
//自定义查询
function selectCustom(sql,callback){
	pool.getConnection(function(err,connection){
		try {
			connection.query(sql,(err,results,fields) => {
				if(err) console.log(err);
				else{
					callback(results)
				}
				
			})
		} catch (error) {
			console.log('出现错误：'+error)
			callback(error)
		}
		connection.release();
	})
}
//查询表中所有数据
function selectAll(table,callback){
	
	pool.getConnection(function(err,connection){
		try {
			connection.query('select * from '+table,(err,results,fields) => {
				if(err) console.log(err);
				else{
					callback(results)
				}
			})
		} catch (error) {
			console.log('出现错误：'+error)
			callback(error)
		}
		
		connection.release();
	})
	
}
function selectFans(user_id,callback){
	pool.getConnection((err,connection) => {
		try {
			connection.query('select fans_id from fanslist where ?',user_id,(err,results,fields) => {
				for(let i=0;i<results.length;++i){
					pool.getConnection((err,con) => {
						con.query('select * from users where ?',{userId:results[i].fans_id},(err,ret) => {
							results[i].fans_name = ret[0].username;
							results[i].fans_logo = ret[0].user_logo;
							results[i].introduction = ret[0].introduction;
							if(i === results.length-1){
								callback(results);
								con.release()
							}
						});
					});
				}
			});
		} catch (error) {
			console.log('出现错误：'+error)
			callback(error)
		}
		connection.release();
	});
}
//查询表中对应的数据两个字段
// function selectAll(table,callback){
// 	var connection = mysql.createConnection(options);
// 	connection.connect();
// 	connection.query('select * from '+table,(err,results,fields) => {
// 		if(err) console.log(err);
// 		else{
// 			callback(results);
// 			connection.end();
// 		}
// 	})
// }
//关注更新
function upDateFans(sql,callback){
	var connection = mysql.createConnection(options);
	connection.connect();
	try {
		connection.query(sql,function(err,results,field){
			if(err) console.log(err);
			else{
				callback(results)
			}
			
		})
	} catch (error) {
		console.log('出现错误：'+error)
		callback(error)
	}
	connection.end();
    
}
//用户信息更新
function upDate(table,data,callback){
	var connection = mysql.createConnection(options);
	connection.connect();
	try {
		connection.query('update '+table+' set ? where ?',data,function(err,results,field){
			if(err) console.log(err);
			else{
				callback(results)
			}
			
		})
	} catch (error) {
		console.log('出现错误：'+error)
		callback(error)
	}
    connection.end();
}
//删除信息
function delFans(user_id,fans_id,callback){
	// var connection = mysql.createConnection(options);
	pool.getConnection(function(err,connection){
		if(err) throw err;
		else{
			connection.query('delete from fanslist where user_id = "'+user_id+'" and fans_id= "'+fans_id+'";',function(err,results,field){
				if(err) throw err;
				else{
					callback(field)
				}
				connection.release();
			})
		}
	})
	// connection.connect();
    // connection.query('delete from fanslist where user_id = "'+user_id+'" and fans_id= "'+fans_id+'";',function(err,results,field){
    //     if(err) console.log(err);
    //     else{
    //         callback(field)
    //     }
    //     connection.end();
    // })
}
function selectAns(que_id,callback){
	pool.getConnection((err,connection) => {
		connection.query('select * from answers where ?',que_id,(err,results) => {
			console.log('select * from answers ');
			if(err) console.log(err);
			else{
				for(let i=0;i<results.length;++i){
					console.log('i:',i);
					pool.getConnection((err,con) => {
						con.query('select * from users where ?',{userId:results[i].user_id},(err,ret) => {
							console.log('select * from users where ?');
							results[i].username = ret[0].username;
							results[i].user_logo = ret[0].user_logo;
							results[i].introduction = ret[0].introduction;
							results[i].fans_num = ret[0].fans_num;
							// i++;
							if(i === results.length-1){
								callback(results);
								con.release();
							} 
						});
					});
				}
			}
		});
		connection.release();
	});
}
// function 
module.exports = {select,selectAll,selectCustom,selectFans,Insert,upDateFans,upDate,delFans,selectAns}