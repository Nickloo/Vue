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
function select(sql) {
    var promise = new Promise(function(resolve,reject) {
        var result = null;
        // var mysql = require('mysql');
        var connection = mysql.createConnection(options);
        connection.connect();
        // connection.query("USE test");
        connection.query(sql, function (err, results, fields) { 
            if (err) { 
                console.log("err");
                reject(err); 
            }else {
                console.log("yessssssss");
                if(results.length > 0) {
                    resolve({status: 'OK'});
                }else {
                    resolve({status: 'NO'});
                }           
            }
			// callback(results) 
          } 
        );
        connection.end(); 
    })

    return promise; 
}
function selectFun(username,callback){
	var connection = mysql.createConnection(options);
    connection.connect();
	connection.query('select password from users where username = "'+username+'";',(err,results,fields) =>{
		if(err) throw err;
		else{
			callback(results);
			connection.end();
		}
	})
}
function login(username,callback){
	// var connection = mysql.createConnection(options);
    // connection.connect();
    // // connection.query("USE test");
    // connection.query('select password from users where username = "'+ username + '";', 
	// function (err, results, fields) { 
    //      if(err) throw err;
	// 	 else{
	// 		 callback(results)
	// 	 }
	// });
    // connection.end();
}
module.exports = {select,selectFun}