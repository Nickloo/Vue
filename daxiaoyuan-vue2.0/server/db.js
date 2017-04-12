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
    password: '123456'
}
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
    var connection = mysql.createConnection(options);
	connection.connect();
    connection.query('insert into '+table+' set ?',data,(err,results,fields) => {
        if(err) console.log(err);
        else{
            callback(results)
        }
        connection.end();
    })
}
//field查询字段 value字段值
function select(table,data,callback){
    let where_str = ' where ?;';
	var connection = mysql.createConnection(options);
	connection.connect();
	connection.query('select * from '+table+where_str,data,(err,results,fields) => {
		if(err) console.log(err);
		else{
			callback(results);
			connection.end();
		}
	})
}
//自定义查询
function selectCustom(sql,callback){
    var connection = mysql.createConnection(options);
	connection.connect();
	connection.query(sql,(err,results,fields) => {
		if(err) console.log(err);
		else{
			callback(results);
			connection.end();
		}
	})
}
//查询表中所有数据
function selectAll(table,callback){
	var connection = mysql.createConnection(options);
	connection.connect();
	connection.query('select * from '+table,(err,results,fields) => {
		if(err) console.log(err);
		else{
			callback(results);
			
		}
        connection.end();
	})
}
//查询表中对应的数据两个字段
function selectAll(table,callback){
	var connection = mysql.createConnection(options);
	connection.connect();
	connection.query('select * from '+table,(err,results,fields) => {
		if(err) console.log(err);
		else{
			callback(results);
			connection.end();
		}
	})
}
//关注更新
function upDateFans(sql,callback){
	var connection = mysql.createConnection(options);
	connection.connect();
    connection.query(sql,function(err,results,field){
        if(err) console.log(err);
        else{
            callback(results)
        }
        connection.end();
    })
}
//用户信息更新
function upDate(table,data,callback){
	var connection = mysql.createConnection(options);
	connection.connect();
    connection.query('update '+table+' set ? where ?',data,function(err,results,field){
        if(err) console.log(err);
        else{
            callback(results)
        }
        connection.end();
    })
}
//删除信息
function delFans(user_id,fans_id,callback){
var connection = mysql.createConnection(options);
	connection.connect();
    connection.query('delete from fanslist where user_id = "'+user_id+'" and fans_id= "'+fans_id+'";',function(err,results,field){
        if(err) console.log(err);
        else{
            callback(field)
        }
        connection.end();
    })
}
// function 
module.exports = {select,selectAll,selectCustom,Insert,upDateFans,upDate,delFans}