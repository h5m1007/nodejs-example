// var http = require('http');
// http.createServer(function(){
// 	throw new Error("错误未被捕获！");
// }).listen(8080);

// process.on('uncaughtException', function(err){
// 	console.error(err);
// 	process.exit(1);
// });

// console.log("服务器启动成功");

var net = require('net');
net.createServer(function(connection){
	connection.on('error', function(err){
		// err错误对象
	});
}).listen(400);

console.log("服务器启动成功");