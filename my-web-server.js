var http = require('http'),
	sev = http.createServer(function(req, res){
		/*
			req用来接受客户端数据
			res用来向客户端发送服务器数据
		*/
		res.writeHead(
			200,
			{'Content-Type': 'text/html'}
		);
		res.end('<marquee>Smashing Node!</marquee>');
	}).listen(8080);

console.log("服务器启动成功");
